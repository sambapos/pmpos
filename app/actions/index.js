import * as types from '../constants/ActionTypes'

export const changeSelectedCategory = category => ({
    type: types.CHANGE_SELECTED_CATEGORY, category
});

export const chageTerminalId = terminalId => ({
    type: types.CHANGE_TERMINALID, terminalId
});

export const updateMessage = message => ({
    type: types.UPDATE_MESSAGE, message
});

export const closeMessage = () => ({
    type: types.CLOSE_MESSAGE
})
