import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/App';
import "material-design-lite";
import "material-design-lite/dist/material.indigo-pink.min.css";

import Login from './auth/login';
import Dashboard from './components/dashboard';
import createBrowserHistory from 'history/createBrowserHistory';
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import HomePage from './components/HomePage';
import OtherComponent from './components/OtherComponent';
import Error404 from './components/Error404';
import ReactDOM from 'react-dom';


import history from './history';

const Root = () => (
  <App>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/other" component={OtherComponent} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  </App>
);

render((
	<div id="outer">
	<Provider store={store}>
  <Root></Root>
	</Provider>
	</div>
), document.body);
