import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import { connect } from 'preact-redux';
import { bindActions } from '../../util';
import reduce from '../../reducers';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
import { Broadcast, Subscriber } from 'react-broadcast';

//@connect(reduce, bindActions(actions))
export default class SideMenu extends Component {
  constructor(props) {
	    super(props);
	    this.closeMenu = this.closeMenu.bind(this);
  }
  componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  closeMenu() {
    /* Temp fix, css broken for dismissing menu sidebar in preact-mdl */
    var menuDiv = document.getElementById("menu");
    menuDiv.classList.remove("is-visible");
    menuDiv.setAttribute("aria-hidden", "true");
    var list = document.getElementsByClassName("mdl-layout__obfuscator");
    if (list.length > 0) { list[0].classList.remove("is-visible"); }
  }
  shouldComponentUpdate() {
    return false;
  }
	render() {
		return (
    <Layout.Drawer id="menu">
      <Layout.Title></Layout.Title>
      <Navigation>
        <Navigation.Link style="align-self: left;" href="/" onClick={this.closeMenu}><i class="fa fa-home" aria-hidden="true"></i> Home</Navigation.Link>
        <Navigation.Link style="align-self: left;" href="/dashboard" onClick={this.closeMenu}><i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Navigation.Link>
        <Navigation.Link style="align-self: left;" href="/" onClick={this.closeMenu}><i class="fa fa-user" aria-hidden="true"></i> Profile</Navigation.Link>
        <Navigation.Link href="/login" onClick={this.closeMenu}>Login</Navigation.Link>
      </Navigation>
    </Layout.Drawer>
		);
	}
}
