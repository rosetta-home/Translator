import { h, Component } from 'preact';
import ReactBroadcast from "ReactBroadcast";

export default class NowDetail extends Component {
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'Now Details');
	}
	render() {
		return (
      <div>


      </div>
    );
	}
}
