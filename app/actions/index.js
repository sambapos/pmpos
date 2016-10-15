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

export const loadEntityScreenRequest = screen => ({ type: types.LOAD_ENTITY_SCREEN_REQUEST, screen });
export const loadEntityScreenSuccess = (screen, items) => ({ type: types.LOAD_ENTITY_SCREEN_SUCCESS, screen, items });
export const loadEntityScreenFailure = (screen, error) => ({ type: types.LOAD_ENTITY_SCREEN_FAILURE, screen, error });

export const loadMyTicketsRequest = () => ({ type: types.LOAD_MYTICKETS_REQUEST });
export const loadMyTicketsSuccess = (items) => ({ type: types.LOAD_MYTICKETS_SUCCESS, items });
export const loadMyTicketsFailure = (error) => ({ type: types.LOAD_MYTICKETS_FAILURE, error });