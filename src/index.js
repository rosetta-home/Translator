import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/app';
import './style';
import "material-design-lite";
import "material-design-lite/dist/material.indigo-pink.min.css";
import Script from 'react-load-script';

render((
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
), document.body);
