import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from "ReactBroadcast";

export default class Login extends Component {
	constructor(props) {
			super(props);
			this.formdata = {};
			this.login = this.login.bind(this);
    }
	componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Login');
	}
	login() {
		authentication.login(this.formdata).then(v => {
			var token = JSON.parse(v.text).success;
			authentication.setCachedToken(token);
			this.formdata = {}
			route('/dashboard');
    });
	}
	onChange(event) {
		this.formdata[event.target.name] = event.target.value;
  }
	render() {
		return (
			<div>
			<Card shadow={4} style="width:100%;padding:20px;">
								<Card.Title>
								</Card.Title>
								<div className="row">
									<div className="col-12">
									   <TextField name="email" placeholder="Email / Username" onChange={this.onChange.bind(this)}></TextField>
									</div>
									<div className="col-12">
									   <TextField name="password" placeholder="Password" onChange={this.onChange.bind(this)}></TextField>
									</div>
								</div>
								<Card.Actions style="text-align:right">
								<Button onClick={this.login}>Login</Button>
								</Card.Actions>
						</Card>

			</div>
		);
	}
}
