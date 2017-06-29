import { h, Component, Link } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import { Button } from 'preact-mdl';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import satori_sdk from "satori-sdk-js";
import ReactOutsideEvent from 'react-outside-event';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { Inject } from 'react-injector';
import Authentication from '../service/authservice';

export default class Login extends Component {
	constructor() {
			super();
			this.formdata = {};
			this.login = this.login.bind(this);
			this.register = this.register.bind(this);

    }
	register() {
		console.log(this.formdata);
		Authentication.register(this.formdata);
		this.formdata = {};
	};
	login() {
		console.log(this.formdata);
		Authentication.login(this.formdata);
		this.formdata = {};
	}
	onChange(event) {
		this.formdata[event.target.name] = event.target.value;
  }
	render({ todos }, { text }) {
		console.log(this.props);
		return (
			<div id="app">
				<h3>Rosetta Home Register </h3>
				<input type="text" name="location_name" value="" placeholder="location_name" onChange={this.onChange.bind(this)}/>
				<input type="text" name="username" value="" placeholder="email" onChange={this.onChange.bind(this)}/>
				<input type="text" name="password" value="" placeholder="password" onChange={this.onChange.bind(this)}/>
				<input type="text" name="kit_number" value="" placeholder="kit_number" onChange={this.onChange.bind(this)}/>
				<input type="text" name="zipcode" value="" placeholder="zipcode" onChange={this.onChange.bind(this)}/>
				<input type="text" name="password_conf" value="" placeholder="password_conf" onChange={this.onChange.bind(this)}/>
				<Button onClick={this.register}>Register</Button>
				<h3>Rosetta Home Login </h3>
				<input type="text" name="username" value="" placeholder="email" onChange={this.onChange.bind(this)}/>
				<input type="text" name="password" value="" placeholder="password" onChange={this.onChange.bind(this)}/>
				<Button onClick={this.login}>Login</Button>
			</div>
		);
	}
}
