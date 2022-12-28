import * as types from './tupes'

const initialState = {
    name: 'Иван',
    visible: true
}

export const profileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.CHANGE_NAME:
            return {
                ...state,
                name: payload
            }
        case types.TOGGLE_PROFILE:
            return {
                ...state,
                visible: !state.visible
            }

        case types.IS_AUTH:
            return {
                ...state,
                isAuth: payload
            }

        default:
            return state
    }
}