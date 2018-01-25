import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

import ReactBroadcast from "reactbroadcast";
import configs from '../../configs';

export default class RightItem extends Component {
  constructor(props) {
	  super(props);
    /* Default state */
    this.state = { icon:null,callback:null }
  }
  /* Component lifecyle methods */
  componentDidMount() {
    /* Create a on call for SetRightItem. Once called via the broadcast will set up the RightItem */
    ReactBroadcast.on('SetRightItem', payload => {
      /* If null payload will remove the button */
      if (payload === null) {
          /* Gets the callback and removes from the broadcaster */
          const { callback } = this.state;
          ReactBroadcast.remove(callback);
          /* Updates the states */
          this.setState({ icon:null,callback:null });
      } else {
          /* Sets the new payload to the state and refresh */
          this.setState(payload);
      }
    });
  }
  /* Fires once the button it click */
  click = () => {
    /* Gets the callback from the state */
    const { callback } = this.state;
    /* Fires the callback */
    ReactBroadcast.broadcast(callback, null);
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render() {
    /* Gets the icon type and callback from the current state */
    const { icon,callback } = this.state;
    /* If null returns a blank component */
    if (icon === null) {
      return (<div></div>);
    }
    /* Return the button */
		return (<i className={icon} onClick={this.click} aria-hidden="true" style="font-size:36px;color:white;"></i>);
	}
}
