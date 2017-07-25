import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactBroadcast from "ReactBroadcast";

export default class SideMenu extends Component {
  constructor(props) {
	    super(props);
	    this.closeMenu = this.closeMenu.bind(this);
      this.state = {
        links:''
      }
  }
  componentDidMount() {
    ReactBroadcast.on('Change_Links', payload => {
      this.setState({
        links:payload
      });
    });
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  /* TODO: Find a better why to interact with the material controls */
  closeMenu() {
    /* Temp fix, css broken for dismissing menu sidebar in preact-mdl */
    var menuDiv = document.getElementById("menu");
    menuDiv.classList.remove("is-visible");
    menuDiv.setAttribute("aria-hidden", "true");
    //var list = document.getElementsByClassName("mdl-layout__obfuscator");
    //if (list.length > 0) { list[0].classList.remove("is-visible"); }
  }
  /* TODO: Need to detect different auth status to display the different login in option the Authentication class will help with this */
	render() {
    const { links } = this.state;
		return (
    <Layout.Drawer id="menu">
      {/* Beginning of the menu layout */}
      <Layout.Title>Rosetta Home</Layout.Title>
      {/* Where the nav link are located */}
      <Navigation>
        <Navigation.Link href="/" onClick={this.closeMenu}>Home</Navigation.Link>
        <Navigation.Link href="/dashboard" onClick={this.closeMenu}>Dashboard</Navigation.Link>
        <Navigation.Link href="/" onClick={this.closeMenu}>Profile</Navigation.Link>
        <Navigation.Link href="/login" onClick={this.closeMenu}>Login</Navigation.Link>
        <Navigation.Link href="/setup" onClick={this.closeMenu}>Setup</Navigation.Link>
      </Navigation>
    </Layout.Drawer>
		);
	}
}
