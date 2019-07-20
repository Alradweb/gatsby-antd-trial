export function closeMenu() {
  return{
    type: 'MENU_CLOSE'
  }
}

export function openMenu() {
  return{
    type: 'MENU_OPEN'
  }
}

export function toggleMenu(payload) {
  return{
    type: 'MENU_TOGGLE',
    payload
  }
}
export function toggleSearch(payload) {
  return{
    type: 'SEARCH_TOGGLE',
    payload
  }
}