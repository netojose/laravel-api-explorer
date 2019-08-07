import React from "react"

import { route as routePropType } from "../../utils/sharedPropTypes"

function RoutePlayground({ route }) {
    return (
        <section>
            <pre>{JSON.stringify(route, null, 4)}</pre>
        </section>
    )
}

RoutePlayground.propTypes = {
    route: routePropType
}

export default RoutePlayground
