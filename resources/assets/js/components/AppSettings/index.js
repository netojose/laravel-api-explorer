import React from "react"

import ParametersInputList from "../ParametersInputList"
import storage from "../../storage"

export default class AppSettings extends React.Component {
    constructor(...args) {
        super(...args)

        const globalHeaders = storage.getGlobalHeaders()

        this.state = { globalHeaders }
    }

    updateGlobalHeaers(globalHeaders) {
        storage.updateGlobalHeaders(globalHeaders)
        this.setState({ globalHeaders })
    }

    handleAddHeader = () => {
        const globalHeaders = this.state.globalHeaders.concat({
            id: new Date().getTime(),
            name: "",
            value: ""
        })
        this.updateGlobalHeaers(globalHeaders)
    }

    handleEdit = (id, type, value) => {
        const globalHeaders = this.state.globalHeaders.map(h => {
            if (h.id === id) {
                h[type] = value
            }
            return h
        })
        this.updateGlobalHeaers(globalHeaders)
    }

    handleDeleteHeader = item => {
        const globalHeaders = this.state.globalHeaders.filter(
            h => h.id !== item.id
        )
        this.updateGlobalHeaers(globalHeaders)
    }

    render() {
        return (
            <section>
                <h6>Global headers</h6>
                <ParametersInputList
                    items={this.state.globalHeaders}
                    handleAdd={this.handleAddHeader}
                    handleDelete={this.handleDeleteHeader}
                    handleChangeName={(evt, item) =>
                        this.handleEdit(item.id, "name", evt.target.value)
                    }
                    handleChangeValue={(evt, item) =>
                        this.handleEdit(item.id, "value", evt.target.value)
                    }
                />
            </section>
        )
    }
}
