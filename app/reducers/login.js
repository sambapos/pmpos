import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

function authenticationRequest(state) {
    state = state.set('accessToken', '');
    state = state.set('refreshToken', '');
    return state.set('isAuthenticating', true);
}

function authenticationSuccess(state, accessToken, refreshToken) {
    localStorage['refresh_token'] = refreshToken;
    localStorage['access_token'] = accessToken;
    state = state.set('accessToken', accessToken);
    state = state.set('refreshToken', refreshToken);
    return state.set('isAuthenticating', false);
}

function authenticationFailure(state) {
    state = state.set('accessToken', '');
    state = state.set('refreshToken', '');
    return state.set('isAuthenticating', false);
}

export default function app(state = Map(), action) {
    switch (action.type) {
        case types.AUTHENTICATION_REQUEST:
            return authenticationRequest(state);
        case types.AUTHENTICATION_SUCCESS:
            return authenticationSuccess(state, action.accessToken, action.refreshToken);
        case types.AUTHENTICATION_FAILURE:
            return authenticationFailure(state);
    }
    return state;
}