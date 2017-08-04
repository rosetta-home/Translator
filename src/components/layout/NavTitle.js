import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactBroadcast from '../../service/reactbroadcast';
import configs from '../../configs';

export default class NavTitle extends Component {
  constructor(props) {
	  super(props);
    this.state = { title:'Rosetta' }
  }
  componentDidMount() {
    ReactBroadcast.on('SetTitle', newtitle => { this.setState({ title:newtitle }); });
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render() {
    const { title } = this.state;
		return (<span>{title}</span>);
	}
}
