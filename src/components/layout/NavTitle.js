import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

import ReactBroadcast from '../../service/reactbroadcast';
import configs from '../../configs';

export default class NavTitle extends Component {
  constructor(props) {
	  super(props);
    /* Default nav title */
    this.state = { title:'Rosetta' }
  }
  componentDidMount() {
    /* Create a on call for OpenModal. Once called via the broadcast will updae the title. */
    ReactBroadcast.on('SetTitle', newtitle => { this.setState({ title:newtitle }); });
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render() {
    /* Gets the title from the current state */
    const { title } = this.state;
    /* Sets the title */
		return (<span>{title}</span>);
	}
}
