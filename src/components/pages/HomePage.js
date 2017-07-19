import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import DRes from '../../service/dres';

export default class HomePage extends Component {
	constructor() {
			super();
			this.data = this.data.bind(this);
    }
	data() {
		console.log(DRes.minutes(60));
		//route('/');
	}
	render() {
		return (
			<div>
					<button onClick={this.data}>Data</button>
			</div>
		);
	}
}
