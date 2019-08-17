function getKey(routeId) {
    return `routeConfig:${routeId}`
}

export function getRouteConfig(routeId) {
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

export function addRouteConfigItem(routeId, type, params) {
    const routeConfig = getRouteConfig(routeId)
    const newItemValue = [
        ...routeConfig[type],
        { name: "", value: "", ...params }
    ]
    persist(routeId, routeConfig, type, newItemValue)
}

export function updateRouteConfigItem(routeId, type, itemId, field, value) {
    const routeConfig = getRouteConfig(routeId)
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
