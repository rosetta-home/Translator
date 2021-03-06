import { h, Component } from 'preact';
import ReactBroadcast from "reactbroadcast";
import { Card, Button } from 'preact-mdl';

export default class NowDetail extends Component {
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Now Details');
	}
	render() {
		return (
      <div>
      <div className="page_outline">
      <Card shadow={4} style="width:100%;">
        <Card.Title>Touchstones #3</Card.Title>

        <Card.Actions style="text-align:right">
        </Card.Actions>
      </Card>
      <br></br>
      <Card shadow={4} style="width:100%;">
        <Card.Title>Touchstones #1</Card.Title>

        <Card.Actions style="text-align:right">
        </Card.Actions>
      </Card>
      <br></br>
      <Card shadow={4} style="width:100%;">
        <Card.Title>Touchstones #2</Card.Title>

        <Card.Actions style="text-align:right">
        </Card.Actions>
      </Card>
      <br></br>
      </div>
      </div>
    );
	}
}
