import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

import ReactBroadcast from "reactbroadcast";
import configs from '../../configs';
import Modal from './Modal';

export default class Layover extends Component {
  constructor(props) {
	  super(props);
    /* Sets the default state for the component */
    this.state = { open:false,body:null,callback:null,props:null };
  }
  componentDidMount() {
    /* Create a on call for OpenModal. Once called via the broadcast a Modal will pop up. */
    ReactBroadcast.on('OpenModal', payload => {
      this.setState({ open:true,body:payload.component, callback:payload.callback, props:payload.props });
    });
  }
  /* Once the component has unmounted it will remove the broadcast */
  componentWillUnmount() {
    ReactBroadcast.remove('OpenModal');
  }
  /* Changes the state to close the modal layover */
  close = () => {
    this.setState({ open:false });
  }
  /* Changes the state to close the modal layover and submit info */
  onDone = (state) => {
    this.setState({ open:false });
  }
	render() {
    const { open,body,callback,props } = this.state;
    /* Gets the body and callbacks from the props */
    const Body = body;
		return (
      <Modal show={open} onClose={this.close}>
        <Body onDone={this.onDone} close={this.close} callback={callback} data={props}/>
      </Modal>
    );
	}
}
