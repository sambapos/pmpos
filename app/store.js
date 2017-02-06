
import { createStore } from 'redux';
import reducer from './reducers';

export const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());