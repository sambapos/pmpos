import {Map} from 'immutable';
import * as types from '../constants/ActionTypes';

function setCategory(state, category) {
    return state.set('selectedCategory', category);
}

function setTerminaId(state, terminalId) {
    return state.set('terminalId', terminalId);
}

function setMessage(state, message) {
    return state.set('message', Map({ text: message, isOpen: true }));
}

function closeMessage(state) {
    return state.set('message', Map({ text: '', isOpen: false }));
}

function setTicket(state, ticket) {
    return state.set('ticket', ticket)
}

function setOrderTagColors(state, colors) {
    return state.set('orderTagColors', colors);
}

function setMenu(state, menu) {
    return state.set('menu', menu);
}

function setMenuItems(state, menuItems) {
    return state.set('menuItems', menuItems);
}

export default function app(state = Map(), action) {
    switch (action.type) {
        case types.CHANGE_SELECTED_CATEGORY:
            return setCategory(state, action.category);
        case types.CHANGE_TERMINALID:
            return setTerminaId(state, action.terminalId);
        case types.UPDATE_MESSAGE:
            return setMessage(state, action.message);
        case types.CLOSE_MESSAGE:
            return closeMessage(state);
        case types.SET_TICKET:
            return setTicket(state, action.ticket);
        case types.SET_ORDER_TAG_COLORS:
            return setOrderTagColors(state, action.colors);
        case types.SET_MENU:
            return setMenu(state, action.menu);
        case types.SET_MENU_ITEMS:
            return setMenuItems(state,action.menuItems)
    }
    return state;
}