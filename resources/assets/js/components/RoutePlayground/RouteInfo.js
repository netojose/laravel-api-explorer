import React from "react"

import { route as routePropType } from "../../utils/sharedPropTypes"

function RouteInfo({ route }) {
    return <pre>{JSON.stringify(route, null, 4)}</pre>
}

RouteInfo.propTypes = {
    route: routePropType.isRequired
}

export default RouteInfo
