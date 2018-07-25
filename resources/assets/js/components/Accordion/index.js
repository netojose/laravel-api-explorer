import React, { Fragment } from "react"

export default class Accordion extends React.Component {
    state = {
        opened: []
    }

    toggleOpen = i => {
        const opened = Object.assign([], this.state.opened)
        let found = opened.filter(item => item !== i)
        if (found.length === opened.length) {
            found = found.concat(i)
        }
        this.setState({ opened: found })
    }

    render() {
        return (
            <div className="accordion">
                {this.props.items.map((item, i) => (
                    <div className="card" key={i}>
                        <div className="card-header">
                            <h5 className="mb-0">
                                <button
                                    className="btn btn-link"
                                    type="button"
                                    onClick={() => this.toggleOpen(i)}
                                >
                                    {item.title}
                                </button>
                            </h5>
                        </div>
                        <div
                            className={`collapse${
                                this.state.opened.find(item => item === i) !==
                                undefined
                                    ? " show"
                                    : ""
                            }`}
                        >
                            <div className="card-body">{item.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
