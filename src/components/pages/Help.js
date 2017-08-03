import { h, Component } from 'preact';
import ReactBroadcast from 'ReactBroadcast';

export default class Help extends Component {
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Help');
	}
	render() {
		return (
      <div>

      </div>
    );
	}

}
