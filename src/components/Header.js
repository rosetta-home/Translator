import { h, Component } from 'preact';
import './Header.css';
import { Button , Layout} from 'preact-mdl';


export default class Header extends Component {
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
