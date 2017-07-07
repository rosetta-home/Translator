import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/App';
import "material-design-lite";
import "material-design-lite/dist/material.indigo-pink.min.css";

import Login from './auth/login';
import createBrowserHistory from 'history/createBrowserHistory';
import "bootstrap/dist/css/bootstrap.css";

import HomePage from './components/pages/HomePage';
import OtherComponent from './components/pages/OtherComponent';
import Error404 from './components/pages/Error404';
import Dashboard from './components/pages/Dashboard';


import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

const Root = () => (
  <App>
    <Router>
      <HomePage path="/" />
      <Dashboard path="/dashboard" />
      <OtherComponent path="/other" />
    </Router>
  </App>
);

render((
	<div id="outer">
	 <Provider store={store}>
    <Root></Root>
	 </Provider>
	</div>
), document.body);
