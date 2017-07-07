import { h, Component } from 'preact';
import { Card, Button, TextField } from 'preact-mdl';

export default class Login extends Component {
	render() {
		return (
			<div>
      <TextField placeholder="email"></TextField>
      <TextField placeholder="password"></TextField>
      <div>
        <Button>Login</Button>
      </div>
			</div>
		);
	}
}
