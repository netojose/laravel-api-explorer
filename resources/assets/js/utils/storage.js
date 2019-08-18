function getKey(routeId) {
    return `routeConfig:${routeId}`
}

export function getRouteArguments(routeId) {
    const key = getKey(routeId)
    const config = window.localStorage.getItem(key)
    const defaultConfig = {
        parameters: [],
        queryStrings: [],
        headers: []
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
    const routeConfig = getRouteArguments(routeId)
    const newItemValue = [
        ...routeConfig[type],
        { name: "", value: "", ...params }
    ]
    persist(routeId, routeConfig, type, newItemValue)
}

export function updateRouteArgumentItem(routeId, type, itemId, field, value) {
    const routeConfig = getRouteArguments(routeId)
    const updateItem = item =>
        item.__id === itemId ? { ...item, [field]: value } : item
    const newItemValue = routeConfig[type].map(updateItem)
    persist(routeId, routeConfig, type, newItemValue)
}

function persist(routeId, routeConfig, type, newItemValue) {
    const newConfigValue = { ...routeConfig, [type]: newItemValue }
    const configKey = getKey(routeId)
    window.localStorage.setItem(configKey, JSON.stringify(newConfigValue))
}
