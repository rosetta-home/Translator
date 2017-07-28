import { h, Component, Link } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';


export default class Login extends Component {
	constructor() {
			super();
    }

	render({ todos }, { text }) {
		console.log(this.props);
		return (
			<div id="app">

			</div>
		);
	}
}
