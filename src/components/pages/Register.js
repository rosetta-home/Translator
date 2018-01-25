import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from "reactbroadcast";

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
		route('/confirm/818f9c45cfa30eeff277ef38bcbe9910');
	}
	onChange(event) {
		/* Updates the formdata as user is entering creds */
		this.formdata[event.target.name] = event.target.value;
  }
	render() {
		return (
			<div>
			<div className="page_outline">
			<Card shadow={4} style="width:100%;">
				<Card.Title>Rosetta Home Portal</Card.Title>
					<div className="row" style="padding:20px;">
						<div className="col-12">
							<TextField name="email" placeholder="Email" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="password" placeholder="Password" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="repassword" placeholder="Confirm Password" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="location" placeholder="Location" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="kitid" placeholder="Kit ID" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="zip" placeholder="Zip" onChange={this.onChange.bind(this)}></TextField>
						</div>
					</div>
				<Card.Actions style="text-align:right">
					<Button raised={true} onClick={this.register}>Register</Button>
				</Card.Actions>
			</Card>
		  </div> </div>
		);
	}
}
