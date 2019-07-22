export function moduleLoaded(payload) {
  return{
    type: 'MODULE_LOADED',
    payload
  }
}