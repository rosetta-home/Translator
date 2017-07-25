import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';
import ReactBroadcast from "ReactBroadcast";

export default class HomePage extends Component {
	constructor() {
		super();
  }
	componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Rosetta Home');
	}
	render() {
		return (
			<div>
			
			</div>
		);
	}
}
