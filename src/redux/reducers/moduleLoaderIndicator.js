const initialState = {
    moduleLoaded: false,
}
export default function moduleLoaderIndicator(state = initialState, action) {
    switch (action.type) {
        case "MODULE_LOADED":
            return {
                ...state,
                moduleLoaded: action.payload,
            }

        default:
            return state
    }
}
