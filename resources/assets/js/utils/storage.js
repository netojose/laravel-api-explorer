function getKey(routeId) {
    return `routeConfig:${routeId}`
}

export function getRouteArguments(routeId) {
    const key = getKey(routeId)
    const config = window.localStorage.getItem(key)
    const defaultConfig = {
        parameters: [],
        queryStrings: [],
        headers: [],
        body: {}
    }

    if (!config) {
        return defaultConfig
    }

    try {
        return JSON.parse(config)
    } catch (e) {
        return defaultConfig
    }
}

export function addRouteArgumentItem(routeId, type, params) {
    const routeArgs = getRouteArguments(routeId)
    const newItemValue = [
        ...routeArgs[type],
        { name: "", value: "", checked: true, ...params }
    ]
    persist(routeId, type, newItemValue)
}

export function updateRouteArgumentItem(routeId, type, itemId, field, value) {
    const routeArgs = getRouteArguments(routeId)
    const updateItem = item =>
        item.__id === itemId ? { ...item, [field]: value } : item
    const newItemValue = routeArgs[type].map(updateItem)
    persist(routeId, type, newItemValue)
}

export function removeRouteArgumentItem(routeId, type, itemId) {
    const routeArgs = getRouteArguments(routeId)
    const newItemValue = routeArgs[type].filter(item => item.__id !== itemId)
    persist(routeId, type, newItemValue)
}

export function toggleCheckRouteArgumentItem(routeId, type, itemId) {
    const routeArgs = getRouteArguments(routeId)
    const newItemValue = routeArgs[type].map(item =>
        item.__id === itemId ? { ...item, checked: !item.checked } : item
    )
    persist(routeId, type, newItemValue)
}

function persist(routeId, type, newItemValue) {
    const routeArgs = getRouteArguments(routeId)
    const newConfigValue = { ...routeArgs, [type]: newItemValue }
    const configKey = getKey(routeId)
    window.localStorage.setItem(configKey, JSON.stringify(newConfigValue))
}

export function updateRouteBodyJson(routeId, content) {
    persist(routeId, "body", content)
}

export function setCurrentActiveRouteId(routeId) {
    window.localStorage.setItem("currentRoute", routeId)
}

export function getCurrentActiveRouteId() {
    return window.localStorage.getItem("currentRoute")
}
