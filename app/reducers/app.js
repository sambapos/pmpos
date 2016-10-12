import {Map} from 'immutable';
import * as types from '../constants/ActionTypes';

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

export default function app(state = Map(), action) {
    switch (action.type) {
        case types.CHANGE_TERMINALID:
            return setTerminaId(state, action.terminalId);
        case types.UPDATE_MESSAGE:
            return setMessage(state, action.message);
        case types.CLOSE_MESSAGE:
            return closeMessage(state);
        case types.SET_TICKET:
            return setTicket(state, action.ticket);
    }
    return state;
}