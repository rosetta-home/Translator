import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';

export default class SideMenu extends Component {
  constructor(props) {
	    super(props);
	    this.closeMenu = this.closeMenu.bind(this);
  }
  closeMenu() {
    /* Temp fix, css broken for dismissing menu sidebar in preact-mdl */
    var menuDiv = document.getElementById("menu");
    menuDiv.classList.remove("is-visible");
    menuDiv.setAttribute("aria-hidden", "true");
    var list = document.getElementsByClassName("mdl-layout__obfuscator");
    if (list.length > 0) { list[0].classList.remove("is-visible"); }
  }
	render() {
		return (
    <Layout.Drawer id="menu">
      <Layout.Title></Layout.Title>
      <Navigation>
        <Navigation.Link href="/" onClick={this.closeMenu}>Home</Navigation.Link>
        <Navigation.Link href="/dashboard" onClick={this.closeMenu}>Dasboard</Navigation.Link>
      </Navigation>
    </Layout.Drawer>
		);
	}
}
