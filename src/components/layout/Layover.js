import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactBroadcast from '../../service/reactbroadcast';
import configs from '../../configs';
import Modal from './Modal';

export default class Layover extends Component {
  constructor(props) {
	  super(props);
    this.state = { open:false,body:null };
  }
  componentDidMount() {
    ReactBroadcast.on('OpenModal', payload => {
      this.setState({ open:true,body:payload });
    });
  }
  componentWillUnmount() {
    ReactBroadcast.remove('OpenModal');
  }
  close = () => {
    this.setState({ open:false });
  }
  onDone = (state) => {
    ReactBroadcast.broadcast('ModalData', state);
    this.setState({ open:false });
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render() {
    const { open,body } = this.state;
    const Body = body;
		return (
      <Modal show={open} onClose={this.close}>
        <Body onDone={this.onDone}/>
      </Modal>
    );
	}
}
