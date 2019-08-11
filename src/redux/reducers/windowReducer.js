const initialState = {
    isWindow: false,
}
export default function windowReducer(state = initialState, action) {
    switch (action.type) {
        case "IS_WINDOW":
            return {
                ...state,
                isWindow: true,
            }

        default:
            return state
    }
}
