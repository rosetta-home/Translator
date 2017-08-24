import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from '../../service/reactbroadcast';

export default class Login extends Component {
	/* Component lifecyle methods */
	constructor(props) {
		super(props);
		this.formdata = {};
		this.state = { failedLogin:false };
		/* Bind the login method to the component */
		this.login = this.login.bind(this);
  }
	componentDidMount() {
		/* ReactBroadcast the updated title  */
		ReactBroadcast.broadcast('SetTitle', 'Login');
		var payload = {icon:'fa fa-question-circle-o',callback:"CallRight"};
    ReactBroadcast.broadcast('SetRightItem', payload);
    ReactBroadcast.on("CallRight", item => {
      route('/help');
    });
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
    }).catch(err => {
			// Change login status and renders the component.
			this.setState({failedLogin:true});
		});
	}
	onChange(event) {
		/* Updates the formdata as user is entering creds */
		this.formdata[event.target.name] = event.target.value;
  }
	render() {
		// Gets the failed login status to determine if to display failed login message
		const { failedLogin } = this.state;
		var emailvalue = '';
		// If the login fails it will get the email last use and display it again.
		if (this.formdata['email'] !== undefined) {
			emailvalue = this.formdata['email'];
		}
		return (
			<div>
			<div className="page_outline">
				<Card shadow={4} style="width:100%;">
					<Card.Title>Rosetta Home Portal</Card.Title>
					<div className="row" style="padding:20px;">
            {failedLogin &&
							<p style="color:red;margin:0px;padding-left:15px;">Incorrect email/password combination.</p>
						}
						<div className="col-12">
							<TextField name="email" placeholder="Email" onChange={this.onChange.bind(this)} value={emailvalue}></TextField>
						</div>
						<div className="col-12">
							<TextField name="password" placeholder="Password" onChange={this.onChange.bind(this)}></TextField>
						</div>
					</div>
					<div style="text-align:left;padding-left: 15px;">
						<small><a href="/reset" style="color:#292b2c;">Did you forget your password?</a></small>
					</div>
					<Card.Actions style="text-align:right">
						<Button onClick={this.login}>Login</Button>
					</Card.Actions>
				</Card>
		  </div>
			</div>
		);
	}
}
