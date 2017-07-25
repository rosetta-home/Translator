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
