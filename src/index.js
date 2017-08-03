import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';
import store from './store';
import createBrowserHistory from 'history/createBrowserHistory';
import "bootstrap/dist/css/bootstrap.css";

import App from './components/App';
import HomePage from './components/pages/HomePage';
import OtherComponent from './components/pages/OtherComponent';
import Error404 from './components/pages/Error404';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Setup from './components/setup/Setup';
import Now from './components/pages/Now';
import NowDetail from './components/pages/NowDetail';
import Confirm from './components/pages/Confirm';
import Devices from './components/pages/Devices';
import Help from './components/pages/Help';

const Root = () => (
  <App>
    <Router>
      <HomePage path="/"/>
      <About path="/about"/>
      <Login path="/login"/>
      <Register path="/register"/>
      <Dashboard path="/dashboard"/>
      <OtherComponent path="/other"/>
      <Setup path="/setup"/>
      <Now path="/now"/>
      <NowDetail path="/now/:id"/>
      <Error404 path="/not-found"/>
      <Confirm path="/confirm/:token"/>
      <Devices path="/devices"/>
      <Help path="/help"/>
    </Router>
  </App>
);

render((
  <Root></Root>
), document.body);
