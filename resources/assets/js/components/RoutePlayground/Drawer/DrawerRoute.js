import React from "react"
import PropTypes from "prop-types"

import DrawerWrapper from "./DrawerWrapper"
import RouteInfo from "./RouteInfo"
import { route as routePropType } from "../../../utils/sharedPropTypes"

function DrawerRoute({ showDrawer, handleCloseDrawer, route }) {
    return (
        <DrawerWrapper
            showDrawer={showDrawer}
            handleCloseDrawer={handleCloseDrawer}
        >
            <RouteInfo route={route} />
        </DrawerWrapper>
    )
}
DrawerRoute.propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    handleCloseDrawer: PropTypes.func.isRequired,
    route: routePropType
}

export default DrawerRoute
