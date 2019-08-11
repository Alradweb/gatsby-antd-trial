const initialState = {
    menuIsOpen: false,
    searchIsOpen: false,
}
export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case "MENU_OPEN":
            return {
                ...state,
                menuIsOpen: true,
            }
        case "MENU_CLOSE":
            return {
                ...state,
                menuIsOpen: false,
            }
        case "MENU_TOGGLE":
            return {
                ...state,
                menuIsOpen: action.payload,
            }
        case "SEARCH_TOGGLE":
            return {
                ...state,
                searchIsOpen: action.payload,
            }
        default:
            return state
    }
}
