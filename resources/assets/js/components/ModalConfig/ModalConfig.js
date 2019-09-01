import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"

import ConfigPanel from "./ConfigPanel"

const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

function ModalConfig({ open, onRequestClose }) {
    const classes = useStyles()
    return (
        <Modal open={open} onClose={onRequestClose} className={classes.modal}>
            <section>
                <ConfigPanel handleClose={onRequestClose} />
            </section>
        </Modal>
    )
}

ModalConfig.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
}

export default ModalConfig
