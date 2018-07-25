import React from "react"
import PropTypes from "prop-types"

import Tabs from "../Tabs"
import RoutePlayground from "../RoutePlayground"

const TabContainer = ({ children }) => <div>{children}</div>

const RowTable = ({ label, value }) =>
    !!value ? (
        <tr>
            <th scope="row">{label}</th>
            <td>
                {Array.isArray(value) ? (
                    <ul>{value.map((item, i) => <li key={i}>{item}</li>)}</ul>
                ) : (
                    value
                )}
            </td>
        </tr>
    ) : null

export default class RouteActions extends React.Component {
    state = {
        currentTab: "playground"
    }

    componentWillUpdate(nextProps) {
        if (nextProps.route.__id !== this.props.route.__id) {
            this.setState({ currentTab: "playground" })
        }
    }

    handleChange = currentTab => {
        this.setState({ currentTab })
    }

    render() {
        const { route } = this.props
        let { currentTab } = this.state
        const hasRules = !!Object.keys(route.rules).length
        const hasParams = !!route.parameters.length

        if (currentTab === "rules" && !hasRules) currentTab = "playground"
        if (currentTab === "params" && !hasParams) currentTab = "playground"

        const tabs = { playground: "Playground", info: "Info" }
        if (hasRules) {
            tabs.rules = "Validation"
        }
        if (hasParams) {
            tabs.params = "Parameters"
        }

        return (
            <section>
                <Tabs
                    onChange={this.handleChange}
                    value={currentTab}
                    items={tabs}
                />
                <section className="mt-3">
                    {currentTab === "playground" && (
                        <RoutePlayground route={route} />
                    )}

                    {currentTab === "info" && (
                        <TabContainer>
                            <table className="table">
                                <tbody>
                                    <RowTable label="Name" value={route.name} />
                                    <RowTable
                                        label="Controller"
                                        value={route.controller}
                                    />
                                    <RowTable
                                        label="Action"
                                        value={route.action}
                                    />
                                    <RowTable label="Path" value={route.uri} />
                                    <RowTable label="URL" value={route.url} />
                                    <RowTable
                                        label="Method"
                                        value={route.http_verb}
                                    />
                                    <RowTable
                                        label="Middlewares"
                                        value={route.middlewares}
                                    />
                                </tbody>
                            </table>
                        </TabContainer>
                    )}
                    {currentTab === "rules" && (
                        <TabContainer>
                            <table className="table">
                                <tbody>
                                    {Object.keys(route.rules).map(key => (
                                        <RowTable
                                            key={key}
                                            label={key}
                                            value={route.rules[key]}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </TabContainer>
                    )}
                    {currentTab === "params" && (
                        <TabContainer>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Regex</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {route.parameters.map(param => (
                                        <RowTable
                                            key={param}
                                            label={param}
                                            value={route.wheres[param] || " "}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </TabContainer>
                    )}
                </section>
            </section>
        )
    }
}

RouteActions.propTypes = {
    route: PropTypes.object.isRequired
}
