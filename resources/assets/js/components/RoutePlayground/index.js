import React, { Fragment } from "react"
import PropTypes from "prop-types"

import axios from "axios"
import uniqueId from "lodash/uniqueId"

import ParametersInputList from "../ParametersInputList"
import Tabs from "../Tabs"
import ResponseDisplayer from "../ResponseDisplayer"
import JsonEditor from "../JsonEditor"

import storage from "../../storage"

const TabInfoText = ({ children }) => <p className="text-muted">{children}</p>

export default class RoutePlayground extends React.Component {
    state = {
        tab: "parameters",
        parameters: [],
        querystring: [],
        headers: [],
        reponseInfo: {},
        requestIsLoading: false,
        responseBody: null,
        requestBody: {}
    }

    responseDisplayerRef = null
    jsonEditorRef = null

    constructor(...args) {
        super(...args)
        this.responseDisplayerRef = React.createRef()
        this.jsonEditorRef = React.createRef()
    }

    componentDidMount() {
        this.fillParameters()
    }

    componentDidUpdate(prevProps, prevState) {
        // Fill parameters on change route
        if (prevProps.route.__id !== this.props.route.__id) {
            this.fillParameters()
            this.setState({ responseBody: null })
        }

        // Update response body
        if (
            JSON.stringify(prevState.responseBody) !==
                JSON.stringify(this.state.responseBody) &&
            this.responseDisplayerRef.current
        ) {
            this.responseDisplayerRef.current.setContent(
                this.state.responseBody
            )
        }

        // Update JSON editor
        const { requestBody } = this.state
        if (
            prevState.tab !== "body" &&
            this.state.tab === "body" &&
            this.jsonEditorRef.current
        ) {
            const editorContent = this.jsonEditorRef.current.getContent()
            if (JSON.stringify(editorContent) !== requestBody) {
                this.jsonEditorRef.current.setContent(requestBody)
            }
        }
    }

    generateId() {
        return uniqueId(`id_${new Date().getTime()}_`)
    }

    fillParameters() {
        let {
            parameters,
            querystring,
            headers,
            requestBody
        } = storage.getRouteSettings(this.props.route.__id)
        this.props.route.parameters.forEach(name => {
            if (!parameters.find(p => p.name === name)) {
                parameters = parameters.concat({
                    id: name,
                    name,
                    disabledName: true,
                    value: ""
                })
            }
        })

        parameters = parameters.filter(p =>
            this.props.route.parameters.includes(p.name)
        )

        this.setState({ parameters, querystring, headers, requestBody })
    }

    addItem(type) {
        const id = this.generateId()
        const newItem = { id, name: "", value: "" }
        const items = this.state[type].concat(newItem)
        this.setState({ [type]: items })
        storage.updateRouteSettings(this.props.route.__id, type, items)
    }

    deleteItem(type, item) {
        const items = Object.assign([], this.state[type])
        const filteredItems = items.filter(i => i.id !== item.id)
        this.setState({ [type]: filteredItems })
        storage.updateRouteSettings(this.props.route.__id, type, filteredItems)
    }

    editItem(type, key, e, item) {
        const items = Object.assign([], this.state[type])
        const editedItems = items.map(i => {
            if (i.id === item.id) {
                i[key] = e.target.value
            }
            return i
        })
        this.setState({ [type]: editedItems })
        storage.updateRouteSettings(this.props.route.__id, type, editedItems)
    }

    handleChangeTab = tab => {
        this.setState({ tab })
    }

    handleUpdateRequestBody = requestBody => {
        this.setState({ requestBody })
        storage.updateRouteSettings(
            this.props.route.__id,
            "requestBody",
            requestBody
        )
    }

    handleMakeRequest = () => {
        this.setState({ requestIsLoading: true, responseBody: null })
        const { url, http_verb } = this.props.route
        let callUrl = url

        // Route parameters
        this.state.parameters.forEach(p => {
            const search = "{" + p.name + "\\??}"
            callUrl = callUrl.replace(new RegExp(search, "g"), p.value)
        })

        const config = {
            method: http_verb.toLowerCase(),
            url: callUrl,
            // responseType: "json",
            validateStatus: () => true
        }

        // Querystring
        const params = {}
        this.state.querystring.forEach(q => {
            params[q.name] = q.value
        })
        if (Object.keys(params).length > 0) {
            config.params = params
        }

        // Headers
        const headers = {}

        const globalHeaders = storage.getGlobalHeaders()
        globalHeaders.forEach(h => {
            headers[h.name] = h.value
        })

        this.state.headers.forEach(h => {
            headers[h.name] = h.value
        })
        if (Object.keys(headers).length > 0) {
            config.headers = headers
        }

        // Request Body
        const { requestBody } = this.state
        if (
            ["put", "post", "patch"].includes(config.method) &&
            Object.keys(requestBody).length > 0
        ) {
            config.data = requestBody
        }

        const startTime = Date.now()

        axios(config).then(response => {
            const duration = Date.now() - startTime
            const { headers, status, statusText, data } = response

            this.setState({
                requestIsLoading: false,
                responseBody: data,
                reponseInfo: {
                    duration,
                    status,
                    statusText,
                    headers
                }
            })
        })
    }

    tabParameters(tab, disableAddAndRemove = false) {
        return this.state.tab !== tab ? null : (
            <div>
                <ParametersInputList
                    disableAddAndRemove={disableAddAndRemove}
                    items={this.state[tab]}
                    handleAdd={() => {
                        this.addItem(tab)
                    }}
                    handleDelete={item => this.deleteItem(tab, item)}
                    handleChangeName={(e, item) =>
                        this.editItem(tab, "name", e, item)
                    }
                    handleChangeValue={(e, item) =>
                        this.editItem(tab, "value", e, item)
                    }
                />
            </div>
        )
    }

    render() {
        const { route, classes } = this.props
        const { tab, responseBody, reponseInfo, requestIsLoading } = this.state

        return (
            <Fragment>
                <p>
                    {route.url}
                    <button
                        className="btn-primary btn-sm float-right"
                        onClick={this.handleMakeRequest}
                    >
                        Make request
                    </button>
                </p>
                <div className="card mb-3">
                    <div className="card-body">
                        <h3>Request</h3>
                        <Tabs
                            onChange={this.handleChangeTab}
                            value={tab}
                            items={{
                                parameters: "Parameters",
                                body: "Body",
                                querystring: "Query string",
                                headers: "Headers"
                            }}
                        />

                        <section className="mt-3">
                            {tab === "parameters" &&
                                route.parameters.length === 0 && (
                                    <TabInfoText>
                                        This route has no url parameters
                                    </TabInfoText>
                                )}

                            {this.tabParameters("parameters", true)}

                            {tab === "body" &&
                                (["GET", "DELETE"].includes(route.http_verb) ? (
                                    <TabInfoText>
                                        Not allowed on GET/DELETE requests
                                    </TabInfoText>
                                ) : (
                                    <Fragment>
                                        <JsonEditor
                                            ref={this.jsonEditorRef}
                                            modes={["code", "tree", "form"]}
                                            initialMode="code"
                                            onUpdateValue={
                                                this.handleUpdateRequestBody
                                            }
                                        />
                                    </Fragment>
                                ))}
                            {this.tabParameters("querystring")}
                            {this.tabParameters("headers")}
                        </section>
                    </div>
                </div>
                {requestIsLoading ? (
                    <p className="text-center">Loading</p>
                ) : !responseBody ? null : (
                    <ResponseDisplayer
                        ref={this.responseDisplayerRef}
                        info={reponseInfo}
                    />
                )}
            </Fragment>
        )
    }
}

RoutePlayground.propTypes = {
    route: PropTypes.object.isRequired
}
