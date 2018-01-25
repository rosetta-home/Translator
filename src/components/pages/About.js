import { h, Component } from 'preact';
import ReactBroadcast from "reactbroadcast";

export default class About extends Component {
	componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'About Rosetta Home');
	}
	render() {
		return (
			<div>
			</div>
		);
	}
}
