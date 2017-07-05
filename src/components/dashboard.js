import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import { Button } from 'preact-mdl';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import StepZilla from 'react-stepzilla';

import Login from '../auth/login';


const steps =
    [
      {name: 'Step 1', component: <Login />},
			{name: 'Step 1', component: <Login />},
			{name: 'Step 1', component: <Login />}

    ]

export default class Dashboard extends Component {
	login = () => {

	};
	render() {
		return (
			<div>
			</div>
		);
	}
}
