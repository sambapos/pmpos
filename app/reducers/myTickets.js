import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

function loadMyTicketsRequest(state) {
    return state.set('isFetching', true);
}
function loadMyTicketsSuccess(state, items) {
    state = state.set('items', items);
    return state.set('isFetching', false);
}
function loadMyTicketsFailure(state) {
    state = state.set('items', []);
    return state.set('isFetching', false);
}
function ticketsNeedsRefresh(state) {
    return state.set('ticketsNeedsRefresh', true);
}
function ticketsRefreshed(state) {
    return state.set('ticketsNeedsRefresh', false);
}

export default function app(state = Map(), action) {
    switch (action.type) {
        case types.LOAD_MYTICKETS_REQUEST:
            return loadMyTicketsRequest(state);
        case types.LOAD_MYTICKETS_SUCCESS:
            return loadMyTicketsSuccess(state, action.items);
        case types.LOAD_MYTICKETS_FAILURE:
            return loadMyTicketsFailure(state, action.error);
        case types.TICKETS_NEEDS_REFRESH:
            return ticketsNeedsRefresh(state);
        case types.TICKETS_REFRESHED:
            return ticketsRefreshed(state);
    }
    return state;
}