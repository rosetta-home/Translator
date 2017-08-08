import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactBroadcast from '../../service/reactbroadcast';
import configs from '../../configs';
import Modal from './Modal';

export default class Layover extends Component {
  constructor(props) {
	  super(props);
    this.state = { open:false,body:null,callback:null,props:null };
  }
  componentDidMount() {
    ReactBroadcast.on('OpenModal', payload => {
      this.setState({ open:true,body:payload.component, callback:payload.callback, props:payload.props });
    });
  }
  componentWillUnmount() {
    ReactBroadcast.remove('OpenModal');
  }
  close = () => {
    this.setState({ open:false });
  }
  onDone = (state) => {
    this.setState({ open:false });
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render() {
    const { open,body,callback,props } = this.state;
    const Body = body;
		return (
      <Modal show={open} onClose={this.close}>
        <Body onDone={this.onDone} close={this.close} callback={callback} data={props}/>
      </Modal>
    );
	}
}
