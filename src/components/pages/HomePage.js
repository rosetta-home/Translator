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
	}
	render() {
		return (
			<div>
			<Card shadow={4} style="width:100%" padding={20}>
								<Card.Title>
										<Card.TitleText></Card.TitleText>
								</Card.Title>
								<div style="padding:20px;height:500px;">

								</div>
								<Card.Actions style="text-align:right">
								</Card.Actions>
						</Card>
						</div>
		);
	}
}
