export function list (array, cb) {
  if (!array.length || Array.isArray(array)) {
    // report error
    return []
  }

  return array.map(cb)
}
