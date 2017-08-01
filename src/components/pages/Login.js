import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from "ReactBroadcast";

export default class Login extends Component {
	/* Component lifecyle methods */
	constructor(props) {
		super(props);
		this.formdata = {};
		/* Bind the login method to the component */
		this.login = this.login.bind(this);
  }
	componentDidMount() {
		/* ReactBroadcast the updated title  */
		ReactBroadcast.broadcast('SetTitle', 'Login');
	}
	/* Login in via the elixir backend */
	login() {
		authentication.login(this.formdata).then(v => {
			/* Gets the token */
			var token = JSON.parse(v.text).success;
			/* Sets the token for the user */
			authentication.setCachedToken(token);
			this.formdata = {}
			/* Re-route to the dashboard */
			route('/dashboard');
    });
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
				<Card.Title>Rosetta Home Portal</Card.Title>
					<div className="row" style="padding:10px;">
						<div className="col-12">
							<TextField name="email" placeholder="Email" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="password" placeholder="Password" onChange={this.onChange.bind(this)}></TextField>
						</div>
					</div>
				<Card.Actions style="text-align:right">
					<Button raised={true} onClick={this.login}>Login</Button>
				</Card.Actions>
			</Card>
		  </div> </div>
		);
	}
}
