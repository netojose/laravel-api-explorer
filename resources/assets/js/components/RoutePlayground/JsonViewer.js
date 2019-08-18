import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.css"

function JsonViewer({ content }) {
    const viewerNodeRef = useRef(null)

    useEffect(() => {
        const options = {
            mode: "view"
        }
        viewerNodeRef.current = new JSONEditor(
            viewerNodeRef.current,
            options,
            content
        )
    }, [])

    useEffect(() => {
        viewerNodeRef.current && viewerNodeRef.current.set(content)
    }, [content])

    return <div ref={viewerNodeRef} />
}

JsonViewer.defaultProps = {
    content: null
}

JsonViewer.propTypes = {
    content: PropTypes.object
}

export default JsonViewer
