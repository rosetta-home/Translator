import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';
import ReactBroadcast from "reactbroadcast";
import d3 from 'd3';
import About from './About';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import React from 'preact-compat';


export default class HomePage extends Component {
	constructor(props) {
		super(props);
  }
	callback = () => {

	}
	componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Rosetta Home');
	}
	componentWillUnmount() {

	}
	handleIn = () => {
		ReactBroadcast.broadcast('Change_Links', true);
	}
	handleOut = () => {
		ReactBroadcast.broadcast('Change_Links', false);
	}
	openmodal = () => {
		ReactBroadcast.broadcast('OpenModal', true);
	}
	render() {
		return (
			<div>
			<br></br>
			<button onClick={this.handleIn}>IN</button>
			<button onClick={this.handleOut}>OUT</button>
			</div>
		);
	}
}
