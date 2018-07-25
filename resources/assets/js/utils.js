export const getColorByHttpVerb = function(verb) {
    const colors = {
        GET: "info",
        POST: "success",
        PATCH: "dark",
        PUT: "warning",
        DELETE: "danger"
    }

    return colors[verb] || "primary"
}
