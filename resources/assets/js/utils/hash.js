import hashSum from "hash-sum"

export function generateRouteId({ http_verb, uri }) {
    return `route_${hashSum({ http_verb, uri })}`
}
