import { h, Component } from 'preact';
import { Card, Button } from 'preact-mdl';
import { route } from 'preact-router';

import ReactBroadcast from '../../service/reactbroadcast';

export default class More extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
		ReactBroadcast.broadcast('SetTitle', 'More');
	}
	render() {
		return (
      <div>
      </div>
    );
	}
}
