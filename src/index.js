import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/App';
//import "material-design-lite";
//import "material-design-lite/dist/material.indigo-pink.min.css";

import createBrowserHistory from 'history/createBrowserHistory';
import "bootstrap/dist/css/bootstrap.css";

import HomePage from './components/pages/HomePage';
import OtherComponent from './components/pages/OtherComponent';
import Error404 from './components/pages/Error404';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Setup from './components/setup/Setup';
import Now from './components/pages/Now';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

const Root = () => (
  <App>
    <Router>
      <HomePage path="/" />
      <Login path="/login" />
      <Dashboard path="/dashboard" />
      <OtherComponent path="/other" />
      <Setup path="/setup" />
      <Now path="/now" />
      <Error404 path="/not-found" />
    </Router>
  </App>
);

render((
	<div id="outer">
    <Root></Root>
	</div>
), document.body);
