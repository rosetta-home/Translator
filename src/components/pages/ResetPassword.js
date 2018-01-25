import { h, Component } from 'preact';
import { Card,TextField,Button } from 'preact-mdl';

import ReactBroadcast from "reactbroadcast";
import authentication from '../../service/authservice';

export default class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.formdata = { };
		this.state = { sent:false };
	}
	componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Reset Password');
	}
	onChange(event) {
		/* Updates the formdata as user is entering creds */
		this.formdata[event.target.name] = event.target.value;
  }
	reset = () => {
		authentication.forgotpassword(this.formdata['email']).then(v => {
			this.setState({sent:true});
    }).catch(err => { });
	}
	render() {
		// Gets the failed login status to determine if to display failed login message
		const { sent } = this.state;
		var emailvalue = '';
		// If the login fails it will get the email last use and display it again.
		if (this.formdata['email'] !== undefined) {
			emailvalue = this.formdata['email'];
		}
		return (
      <div>
			<div className="page_outline">
			<Card shadow={4} style="width:100%;">
				<Card.Title>Reset Password</Card.Title>
					{sent &&
						<div style="text-align:center">
						<p style="color:#5cb85c;margin:0px;padding-left:5px;">A password reset email has been sent to {emailvalue}.</p>
						</div>
			  	}
					<div className="row" style="padding:20px;">
						<p style="color: #2b1e1e;margin: 0px;">Please enter your email. If it exist in our system you will receive a email with a reset link.</p>
						<div className="col-12">
							<TextField name="email" placeholder="Email" onChange={this.onChange.bind(this)} value={emailvalue}></TextField>
						</div>
					</div>
				<Card.Actions style="text-align:right">
					<Button onClick={this.reset}>Reset</Button>
				</Card.Actions>
			</Card>
		  </div> </div>
    );
	}
}
