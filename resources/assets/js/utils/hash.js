import hashSum from "hash-sum"

export function generateRouteId(route) {
    const { name, http_verb, uri } = route
    const obj = name ? { name } : { http_verb, uri }
    return `route_${hashSum(obj)}`
}
