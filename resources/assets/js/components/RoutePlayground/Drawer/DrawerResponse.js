import React from "react"
import PropTypes from "prop-types"

import DrawerWrapper from "./DrawerWrapper"

function DrawerResponse({ showDrawer, handleCloseDrawer, data }) {
    return (
        <DrawerWrapper
            showDrawer={showDrawer}
            handleCloseDrawer={handleCloseDrawer}
        >
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </DrawerWrapper>
    )
}
DrawerResponse.defaultProps = {
    response: null
}
DrawerResponse.propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    handleCloseDrawer: PropTypes.func.isRequired,
    data: PropTypes.shape({
        status: PropTypes.number.isRequired,
        statusText: PropTypes.string.isRequired,
        headers: PropTypes.object.isRequired
    }).isRequired
}

export default DrawerResponse
