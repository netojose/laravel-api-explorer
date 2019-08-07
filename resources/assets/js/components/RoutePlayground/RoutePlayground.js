import React from "react"

import { route as routePropType } from "../../utils/sharedPropTypes"

function RoutePlayground({ route }) {
    return <section>{JSON.stringify(route)}</section>
}

RoutePlayground.propTypes = {
    route: routePropType
}

export default RoutePlayground
