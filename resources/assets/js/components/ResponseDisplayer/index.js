import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { css } from "emotion"

import JsonEditor from "../JsonEditor"
import Accordion from "../Accordion"

const wrapperClass = css({
    " .accordion": {
        marginTop: "1rem"
    }
})

const htmlIframeClass = css({
    borderRadius: ".25rem",
    border: "solid 1px rgba(0, 0, 0, 0.125)",
    minHeight: 300
})

export default class ResponseDisplayer extends React.Component {
    jsonEditorRef = null

    state = { html: null }

    constructor(...args) {
        super(...args)
        this.jsonEditorRef = React.createRef()
    }

    setContent(content) {
        if (this.jsonEditorRef.current) {
            this.jsonEditorRef.current.setContent(content)
            this.setState({ html: null })
            return
        }
        this.setState({ html: content })
    }

    listInfoItem(label, value) {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {label}
                <span className="badge badge-primary badge-pill">{value}</span>
            </li>
        )
    }

    render() {
        const { info } = this.props
        return (
            <div className={`card p-3 ${wrapperClass}`}>
                <h3>Response</h3>

                {info.headers["content-type"] === "application/json" ? (
                    <JsonEditor
                        ref={this.jsonEditorRef}
                        enableEdit={false}
                        initialMode="tree"
                        modes={["tree", "code"]}
                    />
                ) : (
                    <iframe
                        className={htmlIframeClass}
                        srcDoc={this.state.html}
                    />
                )}

                <Accordion
                    items={[
                        {
                            title: "Response info",
                            content: (
                                <Fragment>
                                    <ul className="list-group">
                                        {this.listInfoItem(
                                            "Duration",
                                            `${info.duration}ms`
                                        )}
                                        {this.listInfoItem(
                                            "Status",
                                            info.status
                                        )}
                                        {this.listInfoItem(
                                            "Status text",
                                            info.statusText
                                        )}
                                    </ul>
                                    <table className="table mt-3">
                                        <thead>
                                            <tr>
                                                <th scope="col">Header</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(info.headers).map(
                                                key => (
                                                    <tr key={key}>
                                                        <td
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {key}
                                                        </td>
                                                        <td>
                                                            {info.headers[key]}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </Fragment>
                            )
                        }
                    ]}
                />
            </div>
        )
    }
}

ResponseDisplayer.propTypes = {
    info: PropTypes.object
}
