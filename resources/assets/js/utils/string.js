export function replaceAll(str, find, replace) {
    return str.replace(
        new RegExp(find.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
        replace
    )
}
