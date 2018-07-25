import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

export default class Modal extends React.Component {
    overlayContainer = null

    constructor(...args) {
        super(...args)
        this.overlayContainer = document.createElement("div")
        document.body.appendChild(this.overlayContainer)
    }

    componentDidUpdate(prevProps) {
        const { open } = this.props
        if (prevProps.open === open) {
            return
        }

        if (open) {
            this.addEscHandlerClose()
        } else {
            this.removeEscHandlerClose()
        }
    }

    componentWillUnmount() {
        this.removeEscHandlerClose()
        document.body.removeChild(this.overlayContainer)
    }

    addEscHandlerClose() {
        document.addEventListener("keydown", this.handleEscToClose.bind(this))
    }

    removeEscHandlerClose() {
        document.removeEventListener(
            "keydown",
            this.handleEscToClose.bind(this)
        )
    }

    handleEscToClose(event) {
        if (event.keyCode === 27) {
            this.props.onClose()
        }
    }

    render() {
        const { open, onClose, title, children } = this.props
        return open
            ? ReactDOM.createPortal(
                  <Fragment>
                      {open && <div className="modal-backdrop fade show" />}
                      <div
                          className="modal fade show"
                          tabIndex="-1"
                          role="dialog"
                          style={{ display: "block" }}
                      >
                          <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                  <div className="modal-header">
                                      <h5 className="modal-title">{title}</h5>
                                      <button
                                          type="button"
                                          className="close"
                                          onClick={onClose}
                                      >
                                          <span aria-hidden="true">
                                              &times;
                                          </span>
                                      </button>
                                  </div>
                                  <div className="modal-body">{children}</div>
                                  <div className="modal-footer">
                                      <button
                                          type="button"
                                          className="btn btn-secondary"
                                          onClick={onClose}
                                      >
                                          Close
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Fragment>,
                  this.overlayContainer
              )
            : null
    }
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}
