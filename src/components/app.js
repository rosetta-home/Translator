import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import { Provider } from 'preact-redux';
import store from '../store';
import { Button , Layout, Navigation,Grid,Cell } from 'preact-mdl';
import Authentication from '../service/authservice';
import Login from "../auth/login";
import Header from './layout/Header';
import Footer from './layout/Footer';
import SideMenu from './layout/SideMenu';
import '../style/App.css';
require("babel-core/register");
require("babel-polyfill");

export default class App extends Component {
	start = () => { };
	componentDidMount() { }
	constructor(props) {
	   super(props);
		 /* Binds startt function to the scope to help with debug processes outside the redux container */
		 this.start = this.start.bind(this);
  }
	/* Renders the component*/
	render() {
		return (
			<div className="App">
			{/* Root of the RH application, here is the basic layout of the web app with Google Material. */}
			  <Layout fixed-header fixed-drawer>
				  {/* Header component with title */}
				  <Header/>
					{/* SideMenu with the options and router links */}
					<SideMenu/>
					{/* Provider for the redux storage */}
					<Provider store={store}>
					{/* Layout content area for the preact component */}
          <Layout.Content>
					  {this.props.children}
					</Layout.Content>
					{/* Layout content area end tag */}
					</Provider>
					{/* Provider for the redux storage end tag */}
					</Layout>
					{/* Footer for the whole applicaiton */}
        <Footer/>
      </div>
		);
	}
}
