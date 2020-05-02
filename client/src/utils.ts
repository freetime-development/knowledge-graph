export function list(array, cb) {
    if (!array.length || !array) {
        // report error
        return []
    }

    return array.map(cb)
}