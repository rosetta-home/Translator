import { h, Component } from 'preact';
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

import LiveGraph from '../service/LiveGraph';
import TodoItem from './todo';

@connect(reduce, bindActions(actions))
export default class App extends Component {

	addTodos = () => {

		const nodeID = "0000000081474d35";
		const endpoint = "wss://open-data.api.satori.com";
		const appKey = "da4F19eb331E6465a6C206DE6c9cE2dc";
		const channel = "rosetta-home";


		var rtm = new satori_sdk(endpoint, appKey);
		rtm.on("enter-connected", function() { console.log("Connected to rosetta-home via satori.js!"); });
		var subscription = rtm.subscribe("where", satori_sdk.SubscriptionMode.SIMPLE, {
			filter: 'SELECT * FROM `rosetta-home` WHERE tags.node_id=\"'+ nodeID +'\"',
		});
		var self = this;
		var count = 0;
		subscription.on('rtm/subscription/data', function (pdu) {
			pdu.body.messages.forEach(function (msg) {
				if ('weather_station.outdoor_temperature' === msg.measurement) {
					self.props.addTodo({x:count,y:msg.fields.value});
					count++;
				}
			});
		});
		rtm.start();
	};

	removeTodo = (todo) => {
		this.props.removeTodo(todo);
	};

	updateText = (e) => {
		this.setState({ text: e.target.value });
	};




	render({ todos }, { text }) {
		return (
			<div id="app">
				<h1>Rosetta Home</h1>
				<Button onClick={this.addTodos}>Start</Button>
				<LiveGraph nodeID="0000000081474d35" config="" type="temps" listener="satori_data"/>
			</div>
		);
	}
}
/*
<LiveGraph nodeID="0000000081474d35" config="" type="temps" listener="satori_data" inputRef={el => this.inputElement = el}/>
*/
