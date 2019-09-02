import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"

import SettingsPanel from "./SettingsPanel"

const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

function ModalConfig({ open, onRequestClose, onUpdateSettings }) {
    const classes = useStyles()
    return (
        <Modal open={open} onClose={onRequestClose} className={classes.modal}>
            <section>
                <SettingsPanel
                    handleClose={onRequestClose}
                    onUpdateSettings={onUpdateSettings}
                />
            </section>
        </Modal>
    )
}

ModalConfig.defaultProps = {
    onUpdateSettings: () => null
}

ModalConfig.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onUpdateSettings: PropTypes.func
}

export default ModalConfig
