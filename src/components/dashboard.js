import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import { Button } from 'preact-mdl';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';

export default class Dashboard extends Component {
	login = () => {

	};
	render() {
		return (
			<div id="app">
				<h1>Rosetta Home Dashboard</h1>

			</div>
		);
	}
}
