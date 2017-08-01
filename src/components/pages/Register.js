import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from "ReactBroadcast";

export default class Register extends Component {
	/* Component lifecyle methods */
	constructor(props) {
		super(props);
		this.formdata = {};
		/* Bind the login method to the component */
		this.register = this.register.bind(this);
  }
	componentDidMount() {
		/* ReactBroadcast the updated title  */
		ReactBroadcast.broadcast('SetTitle', 'Register');
	}
	/* Login in via the elixir backend */
	register() {

	}
	onChange(event) {
		/* Updates the formdata as user is entering creds */
		this.formdata[event.target.name] = event.target.value;
  }
	render() {
		return (
			<div>
			<div style="width:100%;padding:10px;">
			<Card shadow={4} style="width:100%;">
				<Card.Title>Rosetta Home Registration</Card.Title>

				<Card.Actions style="text-align:right">
					<Button raised={true} onClick={this.login}>Register</Button>
				</Card.Actions>
			</Card>
		  </div> </div>
		);
	}
}
