import { h, Component } from 'preact';
import ReactBroadcast from "ReactBroadcast";
import { Card, Button } from 'preact-mdl';

export default class NowDetail extends Component {
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Now Details');
	}
	render() {
		return (
      <div>
      <div style="width:100%;padding:10px;">
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