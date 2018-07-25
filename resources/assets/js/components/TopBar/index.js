import React, { Fragment } from "react"
import PropTypes from "prop-types"

export default class TopBar extends React.Component {
    render() {
        const { handleOpenSettings, handleOpenDrawer } = this.props
        return (
            <Fragment>
                <nav className="navbar navbar-dark bg-primary mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={handleOpenDrawer}
                    >
                        Routes
                    </button>
                    <span className="navbar-brand">API Explorer</span>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handleOpenSettings}
                    >
                        Settings
                    </button>
                </nav>
            </Fragment>
        )
    }
}

TopBar.propTypes = {
    handleOpenSettings: PropTypes.func.isRequired,
    handleOpenDrawer: PropTypes.func.isRequired
}
