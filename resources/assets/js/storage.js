class AppStorage {
    getRouteSettings(routeId) {
        const item = window.localStorage.getItem(`routeSettings_${routeId}`)
        const itemObj = JSON.parse(item)
        return (
            itemObj || {
                parameters: [],
                querystring: [],
                headers: [],
                requestBody: {}
            }
        )
    }

    updateRouteSettings(routeId, type, value) {
        const settings = Object.assign({}, this.getRouteSettings(routeId))
        settings[type] = value
        window.localStorage.setItem(
            `routeSettings_${routeId}`,
            JSON.stringify(settings)
        )
    }

    getGlobalHeaders() {
        const items = window.localStorage.getItem("globalHeaders")
        const headers = JSON.parse(items)
        return headers || []
    }

    updateGlobalHeaders(headers) {
        window.localStorage.setItem("globalHeaders", JSON.stringify(headers))
    }
}

export default new AppStorage()
