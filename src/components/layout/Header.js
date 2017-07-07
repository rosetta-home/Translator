import { h, Component } from 'preact';
import { Button , Layout} from 'preact-mdl';
import '../../style/Header.css';

export default class Header extends Component {
  constructor(props) {
	   super(props);
  }
	render() {
		return (
    <Layout.Header style="background-color: #ef6c00;">
      <Layout.HeaderRow>
      <Layout.Title>Rosetta Home</Layout.Title>
      </Layout.HeaderRow>
    </Layout.Header>
		);
	}
}
