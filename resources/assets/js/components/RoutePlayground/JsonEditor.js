import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import hashSum from "hash-sum"
import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.css"

function JsonEditor({ content, onChange }) {
    const editorNodeRef = useRef(null)
    const editorRef = useRef()

    useEffect(() => {
        const options = {
            mode: "code",
            enableSort: false,
            enableTransform: false,
            onChangeText: onChange
        }
        editorRef.current = new JSONEditor(
            editorNodeRef.current,
            options,
            content
        )

        editorRef.current.focus()
    }, [])

    useEffect(() => {
        if (!editorRef.current) {
            return
        }

        const currentContent = editorRef.current.get()

        if (hashSum(content) === hashSum(currentContent)) {
            return
        }

        editorRef.current.update(content)
    }, [content])

    useEffect(() => {
        return () => editorRef.current && editorRef.current.destroy()
    }, [])

    return <div ref={editorNodeRef} style={{ height: "450px" }} />
}

JsonEditor.propTypes = {
    content: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default JsonEditor
