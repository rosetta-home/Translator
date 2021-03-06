import { h, Component } from 'preact';
import ReactBroadcast from "reactbroadcast";
import { Card, Button, TextField } from 'preact-mdl';
import { route } from 'preact-router';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
		/* ReactBroadcast the updated title  */
		ReactBroadcast.broadcast('SetTitle', 'Confirm');
	}

  setup = () => {
    route('/setup');
  }
	render() {
		return (
      <div>
      <div>
      <div className="page_outline">
      <Card shadow={4} style="width:100%;">
        <Card.Title>Account Confirmed</Card.Title>
        <p style="color:black;">Your account has been successfully confirm. Proceed to setup to complete your installation of Rosetta Home.</p>
        <Card.Actions style="text-align:right">
          <Button onClick={this.setup}>Setup</Button>
        </Card.Actions>
      </Card>
      </div>
      </div>
      </div>
    );
	}
}
