import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactBroadcast from "ReactBroadcast";
import authentication from '../../service/authservice';

export default class SideMenu extends Component {
  constructor(props) {
	    super(props);
	    this.closeMenu = this.closeMenu.bind(this);
      var tempbool = false;
      if (authentication.getToken() !== '') {
        tempbool = true;
      }
      this.state = {
        guestlinks:[
          {'title':'Home','route':'/'},
          {'title':'About','route':'/about'},
          {'title':'Setup','route':'/setup'},
          {'title':'Login','route':'/login'},
          {'title':'Register','route':'/register'}
        ],
        userlinks:[
          {'title':'Home','route':'/'},
          {'title':'Now','route':'/now'},
          {'title':'Dashboard','route':'/dashboard'},
          {'title':'Touchstones','route':'/devices'}
        ],
        isLoggedIn:tempbool
      }
  }
  componentDidMount() {
    ReactBroadcast.on('Change_Links', payload => {
      this.setState({
        isLoggedIn:payload
      });
    });
  }
 	componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  componentWillReceiveProps(nextProps) { }
  closeMenu() {
    var menuDiv = document.getElementById("menu");
    menuDiv.classList.remove("is-visible");
    menuDiv.setAttribute("aria-hidden", "true");
  }
	render() {
    const { guestlinks,userlinks,isLoggedIn } = this.state;

    var link = [];
    if (isLoggedIn) {
      for (var i = 0; i < userlinks.length; i++) {
        link.push(<Navigation.Link href={userlinks[i].route} onClick={this.closeMenu}>{userlinks[i].title}</Navigation.Link>);
      }
    } else {
      for (var i = 0; i < guestlinks.length; i++) {
        link.push(<Navigation.Link href={guestlinks[i].route} onClick={this.closeMenu}>{guestlinks[i].title}</Navigation.Link>);
      }
    }
		return (
    <Layout.Drawer id="menu">
      {/* Beginning of the menu layout */}
      <Layout.Title>Rosetta Home</Layout.Title>
      {/* Where the nav link are located */}
      <Navigation>
        {link}
      </Navigation>
    </Layout.Drawer>
		);
	}
}
