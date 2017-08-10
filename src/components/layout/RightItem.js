import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

import ReactBroadcast from '../../service/reactbroadcast';
import configs from '../../configs';

export default class RightItem extends Component {
  constructor(props) {
	  super(props);
    this.state = { icon:null,callback:null }
  }
  componentDidMount() {
    ReactBroadcast.on('SetRightItem', payload => {
      if (payload === null) {
          const { callback } = this.state;
          ReactBroadcast.remove(callback);
          this.setState({ icon:null,callback:null });
      } else {
          this.setState(payload);
      }
    });
  }
  click = () => {
    const { callback } = this.state;
    ReactBroadcast.broadcast(callback, null);
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render() {
    const { icon,callback } = this.state;
    if (icon === null) {
      return (<div></div>);
    }
		return (<i className={icon} onClick={this.click} aria-hidden="true" style="font-size:36px;color:white;"></i>);
	}
}
