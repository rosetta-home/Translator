import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';
import authentication from '../../service/authservice';
import { route } from 'preact-router';
import ReactBroadcast from "reactbroadcast";

export default class Signup extends Component {
	/* Component lifecyle methods */
	constructor(props) {
		super(props);
		this.formdata = {};
		/* Bind the login method to the component */
		this.signup = this.signup.bind(this);
  }
	componentDidMount() {
		/* ReactBroadcast the updated title  */
		ReactBroadcast.broadcast('SetTitle', 'Sign Up');
	}
	/* Login in via the elixir backend */
	signup() {
    console.log(this.formdata);
    route('/email');
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
				<Card.Title>Sign Up</Card.Title>
					<div className="row" style="padding:20px;">
						<div className="col-12">
							<TextField name="email" placeholder="Email" onChange={this.onChange.bind(this)}></TextField>
						</div>
						<div className="col-12">
							<TextField name="password" placeholder="Password" onChange={this.onChange.bind(this)}></TextField>
						</div>
            <div className="col-12">
							<TextField name="password" placeholder="Re-Password" onChange={this.onChange.bind(this)}></TextField>
						</div>
            <div className="col-12">
							<TextField name="kitid" placeholder="Kit ID" onChange={this.onChange.bind(this)}></TextField>
						</div>
            <div className="col-12">
							<TextField name="zip" placeholder="Zip" onChange={this.onChange.bind(this)}></TextField>
						</div>
					</div>
				<Card.Actions style="text-align:right">
					<Button onClick={this.signup}>Sign Up</Button>
				</Card.Actions>
			</Card>
		  </div> </div>
		);
	}
}
