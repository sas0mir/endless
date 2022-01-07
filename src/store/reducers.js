import { ACTION_CHANGE_NAME } from '../index'

const initialState = {
    name: 'OLEG'
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_NAME:
            return { ...state, name: action.payload }
    }
    return state
}