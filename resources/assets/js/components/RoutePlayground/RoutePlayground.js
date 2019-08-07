import React from "react"

import { route as routePropType } from "../../utils/sharedPropTypes"

function RoutePlayground({ route }) {
    return <pre>{JSON.stringify(route, null, 4)}</pre>
}

RoutePlayground.propTypes = {
    route: routePropType.isRequired
}

export default RoutePlayground
