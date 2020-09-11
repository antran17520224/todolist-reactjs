import * as types from './../constants/ActionType'

export const sort = (sort) => {
    return {
        type : types.SORT,
        sort
    }
}
export const status = () => {
    return {
        type : types.TOGGLE_STATUS,
    }
}