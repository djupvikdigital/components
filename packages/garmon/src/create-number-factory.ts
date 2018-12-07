export function createNumberFactory(start = 0) {
  let counter = start
  return function numberFactory() {
    return counter++
  }
}
