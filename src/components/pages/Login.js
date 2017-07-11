import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import Authentication from '../../service/authservice';

export default class Login extends Component {
	constructor() {
			super();
			this.formdata = {};
			this.login = this.login.bind(this);
    }
	login() {
		console.log(this.formdata);
		Authentication.login(this.formdata);
		this.formdata = {};
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
								<TextField name="email" placeholder="email" onChange={this.onChange.bind(this)}></TextField>
					      <TextField name="password" placeholder="password" onChange={this.onChange.bind(this)}></TextField>
								<Card.Actions style="text-align:right">
								<button onClick={this.login}>Login</button>
								</Card.Actions>
						</Card>

			</div>
		);
	}
}
