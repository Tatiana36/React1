import * as types from './tupes'


export const changeName = (data) => ({
    type: types.CHANGE_NAME,
    payload: data
})