import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import EntityList from './components/Entities/EntityList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, hashHistory } from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';

const store = createStore(reducer,window.devToolsExtension && window.devToolsExtension());

store.dispatch({
  type: 'CHANGE_SELECTED_CATEGORY',
  category: ''
});

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

injectTapEventPlugin();

const AppHandler = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory }>
        <Route path="/" component={App}></Route>
        <Route path="/entities" component={EntityList}></Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <AppHandler />,
  document.getElementById('app')
);
