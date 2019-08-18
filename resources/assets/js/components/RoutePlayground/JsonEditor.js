import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.css"

function JsonEditor({ initialContent, onChange }) {
    const editorRef = useRef(null)
    const [jsonEditor, setJsonEditor] = useState(null)

    useEffect(() => {
        const options = {
            mode: "code",
            onChangeText: onChange
        }
        const editor = new JSONEditor(editorRef.current, options)
        editor.set(initialContent)
        setJsonEditor(editor)
    }, [])

    useEffect(() => {
        return () => jsonEditor && jsonEditor.destroy()
    }, [])

    return <div ref={editorRef} />
}

JsonEditor.defaultProps = {
    initialContent: {}
}

JsonEditor.propTypes = {
    initialContent: PropTypes.object,
    onChange: PropTypes.func.isRequired
}

export default JsonEditor
