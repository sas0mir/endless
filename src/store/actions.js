import { ACTION_CHANGE_NAME } from '../index'
//для примера
export const changeName = (newName) => {
    return {
        type: ACTION_CHANGE_NAME,
        payload: newName
    }
}