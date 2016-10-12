import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

function loadEntityScreenRequest(state, screen) {
    return state.set('isFetching', true);
}
function loadEntityScreenSuccess(state, screen, items) {
    state = state.set('items', items);
    return state.set('isFetching', false);
}
function loadEntityScreenFailure(state, screen) {
    state = state.set('items', []);
    return state.set('isFetching', false);
}

export default function app(state = Map(), action) {
    switch (action.type) {
        case types.LOAD_ENTITY_SCREEN_REQUEST:
            return loadEntityScreenRequest(state, action.screen);
        case types.LOAD_ENTITY_SCREEN_SUCCESS:
            return loadEntityScreenSuccess(state, action.screen, action.items);
        case types.LOAD_ENTITY_SCREEN_FAILURE:
            return loadEntityScreenFailure(state, action.screen, action.error);
    }
    return state;
}