import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import satori_sdk from "satori-sdk-js";
import ReactOutsideEvent from 'react-outside-event';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';

import RHLiveGraph from './LiveGraph';
import Authentication from '../service/authservice';
//import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Router, Route, Switch,MemoryRouter,Link } from 'react-router';
import Login from "../auth/login";
import Header from './Header';
import Footer from './Footer';
import './App.css';

import { browserHistory } from 'react-router'

@connect(reduce, bindActions(actions))
export default class App extends Component {
	start = () => {
		console.log("Start");
		console.log(Authentication.get('title'));
		/*const nodeID = "0000000081474d35";
		const endpoint = "wss://open-data.api.satori.com";
		const appKey = "da4F19eb331E6465a6C206DE6c9cE2dc";
		const channel = "rosetta-home";
		var rtm = new satori_sdk(endpoint, appKey);
		rtm.on("enter-connected", function() { console.log("Connected to rosetta-home via satori.js!"); });
		var subscription = rtm.subscribe("where", satori_sdk.SubscriptionMode.SIMPLE, {
			filter: 'SELECT * FROM `rosetta-home` WHERE tags.node_id=\"'+ nodeID +'\"',
		});
		var self = this;
		subscription.on('rtm/subscription/data', function (pdu) {
			pdu.body.messages.forEach(function (msg) {
				console.log(msg);
				self.props.addData(msg);
			});
		});
		rtm.start();*/
	};
	constructor(props) {
	super(props);

	this.toggleNavbar = this.toggleNavbar.bind(this);
	this.state = {
		collapsed: true
	};
}

toggleNavbar() {
browserHistory.push('/some/path')
}
	render() {
		console.log(this.props);
		return (
			<div className="App">
			<Layout fixed-header fixed-drawer>
									<Header/>
									<Layout.Drawer>
                <Layout.Title></Layout.Title>
								<Navigation>
								<a onClick={this.toggleNavbar}>Here</a>
                </Navigation>
            		</Layout.Drawer>
 								<Layout.Content>
								  {this.props.children}
								</Layout.Content>
							</Layout>
        <Footer/>
      </div>
		);
	}
}
