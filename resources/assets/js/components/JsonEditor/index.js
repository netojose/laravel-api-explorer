import React from "react"
import PropTypes from "prop-types"
import { css } from "emotion"

import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.min.css"

const wrapperClass = css({
    " .jsoneditor .jsoneditor-menu .jsoneditor-transform": {
        display: "none"
    },
    "&.readonly .jsoneditor-tree .jsoneditor-contextmenu": {
        display: "none"
    }
})

class JsonEditor extends React.Component {
    editor = null
    container = null

    constructor(...args) {
        super(...args)
        this.container = React.createRef()
    }

    componentDidMount() {
        const { initialMode, modes, enableEdit } = this.props
        const config = {
            mode: initialMode,
            onChange: this.onChange,
            onEditable: () => enableEdit,
            search: true,
            modes
        }
        this.editor = new JSONEditor(this.container.current, config)
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillUnmount() {
        if (this.editor) {
            this.editor.destroy()
        }
    }

    setContent(json) {
        this.editor.set(json)
    }

    setViewMode(mode) {
        this.editor.setMode(mode)
    }

    getContent() {
        let content
        try {
            content = this.editor.get()
        } catch (err) {
            content = null
        }
        return content
    }

    onChange = () => {
        if (!this.props.onUpdateValue) {
            return
        }
        try {
            const json = this.editor.get()
            this.props.onUpdateValue(json)
        } catch (err) {
            // err
        }
    }

    render() {
        const readonly = this.props.enableEdit ? "" : " readonly"
        return (
            <div
                className={`mt-3 ${wrapperClass}${readonly}`}
                ref={this.container}
            />
        )
    }
}

JsonEditor.defaultProps = {
    initialMode: "tree",
    modes: [],
    enableEdit: true
}

JsonEditor.propTypes = {
    initialMode: PropTypes.oneOf(["tree", "view", "form", "code"]),
    enableEdit: PropTypes.bool,
    onUpdateValue: PropTypes.func
}

export default JsonEditor
