import { h, Component } from 'preact';
import { Button , Layout} from 'preact-mdl';
import '../../style/Header.css';
import ReactBroadcast from "ReactBroadcast";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.title = "Rosetta Home";
    ReactBroadcast.on('updateTitle', value => { this.title = value; });
  }
	render() {
		return (
    <Layout.Header style="background-color: #ef6c00;">
      {/* Layout for the header with the title */}
      <Layout.HeaderRow>
      {/* The title for the actual header, idea is to have an listener than will detect the state change and change the title like on the native mobile platform */}
      <Layout.Title>{this.title}</Layout.Title>
      </Layout.HeaderRow>
    </Layout.Header>
		);
	}
}
