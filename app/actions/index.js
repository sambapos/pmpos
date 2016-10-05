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

export const setTicket = ticket => ({
    type: types.SET_TICKET, ticket
});

export const setOrderTagColors = colors => ({ type: types.SET_ORDER_TAG_COLORS, colors });
export const setMenu = menu => ({ type: types.SET_MENU, menu });
export const setMenuItems = menuItems => ({ type: types.SET_MENU_ITEMS, menuItems });