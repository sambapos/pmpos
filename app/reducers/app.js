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
    }
    return state;
}