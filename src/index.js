import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/app';
import './style';
import "material-design-lite";
import "material-design-lite/dist/material.indigo-pink.min.css";
import Script from 'react-load-script';
import Login from './auth/login';
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
    <Route path="/" component={App}>
      <Route path="/login" component={Login}></Route>
    </Route>
  </Router>
);

render((
	<div id="outer">
	<Provider store={store}>
	<Routes history={createBrowserHistory()}/>
	</Provider>
	</div>
), document.body);
