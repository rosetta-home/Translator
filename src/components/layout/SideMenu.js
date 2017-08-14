import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import ReactBroadcast from '../../service/reactbroadcast';
import authentication from '../../service/authservice';

export default class SideMenu extends Component {
  constructor(props) {
	    super(props);
      var tempbool = false;
      if (authentication.getToken() !== '') {
        tempbool = true;
      }
      // The init state
      this.state = {
        guestlinks:[
          {'title':'Home','route':'/'},
          {'title':'About','route':'/about'},
          {'title':'Setup','route':'/setup'},
          {'title':'Login','route':'/login'},
          {'title':'Register','route':'/register'},
          {'title':'Help','route':'/help'}
        ],
        userlinks:[
          {'title':'Home','route':'/'},
          {'title':'Now','route':'/now'},
          {'title':'Dashboard','route':'/dashboard'},
          {'title':'Dashboard 2','route':'/dashboard2'},
          {'title':'Touchstones','route':'/devices'},
          {'title':'Help','route':'/help'}
        ],
        isLoggedIn:tempbool
      }
  }
  /* Component lifecyle function */
  componentDidMount() {
    ReactBroadcast.on('Change_Links', payload => {
      this.setState({
        isLoggedIn:payload
      });
    });
  }
  componentWillReceiveProps(nextProps) { }
  closeMenu = () => {
    var menuDiv = document.getElementById("menu");
    menuDiv.classList.remove("is-visible");
    menuDiv.setAttribute("aria-hidden", "true");
  }
	render() {
    const { guestlinks,userlinks,isLoggedIn } = this.state;
    // Array for the link and renders
    var link = [];
    // If logged in has userlink vs guestlinks
    if (isLoggedIn) {
      for (var i = 0; i < userlinks.length; i++) {
        // Adds link to links array
        link.push(<Navigation.Link href={userlinks[i].route} onClick={this.closeMenu}>{userlinks[i].title}</Navigation.Link>);
      }
    } else {
      for (var i = 0; i < guestlinks.length; i++) {
        // Adds link to links array
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
