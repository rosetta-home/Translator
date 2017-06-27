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

import RHLiveGraph from '../service/LiveGraph';
import TodoItem from './todo';

@connect(reduce, bindActions(actions))
export default class App extends Component {
	randomIntFromInterval(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  };
	addTodos = () => {


		const nodeID = "0000000081474d35";
		const endpoint = "wss://open-data.api.satori.com";
		const appKey = "da4F19eb331E6465a6C206DE6c9cE2dc";
		const channel = "rosetta-home";

		//WHERE tags.node_id=\"'+ nodeID +'\"
		var rtm = new satori_sdk(endpoint, appKey);
		rtm.on("enter-connected", function() { console.log("Connected to rosetta-home via satori.js!"); });
		var subscription = rtm.subscribe("where", satori_sdk.SubscriptionMode.SIMPLE, {
			filter: 'SELECT * FROM `rosetta-home` WHERE tags.node_id=\"'+ nodeID +'\"',
		});
		var self = this;
		var count = 0;
		var xx = 0;
		var yy = 0;
		subscription.on('rtm/subscription/data', function (pdu) {
			pdu.body.messages.forEach(function (msg) {
				console.log(msg);
				self.props.addData(msg);
			});
		});
		rtm.start();

		/*var self = this;
		setInterval(function() {
			self.props.addData({});
		}, 1000);*/
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
				<div id="graphs"></div>
				<RHLiveGraph nodeID="0000000081474d35" type="weather_station.indoor_temperature,weather_station.outdoor_temperature"/>
				<RHLiveGraph nodeID="0000000081474d35" type="ieq.temperature,weather_station.indoor_temperature,weather_station.outdoor_temperature,hvac.temperature"/>

			</div>
		);
	}
}
/*
<LiveGraph nodeID="0000000081474d35" config="" type="temps" listener="satori_data" inputRef={el => this.inputElement = el}/>
*/
