import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from '../../service/reactbroadcast';

export default class CheckEmail extends Component {
	/* Component lifecyle methods */
	constructor(props) {
		super(props);
  }
	componentDidMount() {
		/* ReactBroadcast the updated title  */
		ReactBroadcast.broadcast('SetTitle', 'Rosetta Home');
	}
	/* Login in via the elixir backend */
	resend() {
    console.log(this.formdata);
	}

	render() {
		return (
			<div>
			<div className="page_outline">
			<Card shadow={4} style="width:100%;">
				<Card.Title>Please check your email</Card.Title>

				<Card.Actions style="text-align:right">
					<Button onClick={this.resend}>Re-Send Email</Button>
				</Card.Actions>
			</Card>
		  </div> </div>
		);
	}
}
