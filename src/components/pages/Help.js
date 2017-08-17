import { h, Component } from 'preact';
import ReactBroadcast from '../../service/reactbroadcast';
import { Card, Button, TextField } from 'preact-mdl';

export default class Help extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Help');
	}
	render() {
		return (
      <div>
			<div style="width:100%;padding:10px;">
			<Card shadow={4} style="width:100%;">
				<Card.Title>Q&A</Card.Title>

				<Card.Actions style="text-align:right">
				</Card.Actions>
			</Card>
		  </div>
      </div>
    );
	}

}
