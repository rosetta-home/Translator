import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DemoChart from '../elements/DemoChart';

export default class HomePage extends Component {
	render() {
		return (
			<div>
			<DemoChart/>
			</div>
		);
	}
}
