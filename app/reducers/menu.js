import {Map} from 'immutable';
import * as types from '../constants/ActionTypes';

function setCategory(state, category) {
    return state.set('selectedCategory', category);
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
        case types.SET_ORDER_TAG_COLORS:
            return setOrderTagColors(state, action.colors);
        case types.SET_MENU:
            return setMenu(state, action.menu);
        case types.SET_MENU_ITEMS:
            return setMenuItems(state, action.menuItems)
    }
    return state;
}