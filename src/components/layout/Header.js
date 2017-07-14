import { h, Component } from 'preact';
import { Button , Layout} from 'preact-mdl';
import '../../style/Header.css';

export default class Header extends Component {
  constructor(props) { super(props); }
	render() {
		return (
    <Layout.Header style="background-color: #ef6c00;">
      {/* Layout for the header with the title */}
      <Layout.HeaderRow>
      {/* The title for the actual header, idea is to have an listener than will detect the state change and change the title like on the native mobile platform */}
      <Layout.Title>Rosetta Home</Layout.Title>
      </Layout.HeaderRow>
    </Layout.Header>
		);
	}
}
