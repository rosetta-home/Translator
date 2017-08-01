import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';
import ReactBroadcast from "ReactBroadcast";
import d3 from 'd3';

export default class HomePage extends Component {
	constructor() {
		super();
  }
	componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Rosetta Home');
	}
	handleIn = () => {
		ReactBroadcast.broadcast('Change_Links', true);
	}
	handleOut = () => {
		ReactBroadcast.broadcast('Change_Links', false);
	}
	render() {
		return (
			<div>
			<br></br>
			<Button onClick={this.handleIn}>IN</Button>
			<Button onClick={this.handleOut}>OUT</Button>
			</div>
		);
	}
}
