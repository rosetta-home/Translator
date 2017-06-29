import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/app';
import './style';
import "material-design-lite";
import "material-design-lite/dist/material.indigo-pink.min.css";
import Script from 'react-load-script';
import Login from './auth/login';
import Dashboard from './components/dashboard';
import { Router, Route, Switch,MemoryRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

/*<div id="outer">
	<Provider store={store}>
		<App/>
	</Provider>
</div>
*/

const Routes = (props) => (
  <Router {...props}>
	<Switch>
		<Route exact path="/" component={App}/>
		<Route path="/login" component={Login}/>
		<Route path="/register" component={Login}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route component={App}/>
	</Switch>
  </Router>
);

render((
	<div id="outer">
	<Provider store={store}>
	<Routes history={createBrowserHistory()}/>
	</Provider>
	</div>
), document.body);
