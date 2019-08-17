function getKey(routeId) {
    return `routeConfig:${routeId}`
}

export function getStoredRouteConfig(routeId) {
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

export function storeRouteConfigItem(routeId, type, id, name, value) {
    const routeConfig = getStoredRouteConfig(routeId)
    const exists = routeConfig[type].find(item => item.__id === id)
    const updateItem = item => (item.__id === id ? { ...item, value } : item)
    const newItemValue = exists
        ? routeConfig[type].map(updateItem)
        : [...routeConfig[type], { __id: id, name, value }]
    const newConfigValue = { ...routeConfig, [type]: newItemValue }
    const configKey = getKey(routeId)
    window.localStorage.setItem(configKey, JSON.stringify(newConfigValue))
}
