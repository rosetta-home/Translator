import { h, Component } from 'preact';
import { Button , Layout, Navigation} from 'preact-mdl';
import '../../style/Header.css';
import ReactBroadcast from "ReactBroadcast";
import NavTitle from './NavTitle';
import RightItem from './RightItem';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'Rosetta Home'
    };
  }
  componentDidMount() { }
	render() {
    const { title } = this.state;
		return (
    <Layout.Header className="header_style">
      {/* Layout for the header with the title */}
      <Layout.HeaderRow>
      {/* The title for the actual header, idea is to have an listener than will detect the state change and change the title like on the native mobile platform */}
      <Layout.Title><NavTitle/></Layout.Title>
      <Layout.Spacer />
      {/*<i className="fa fa-clock-o" aria-hidden="true" style="font-size:36px;color:white;"></i>*/}
      <RightItem/>
      </Layout.HeaderRow>
    </Layout.Header>
		);
	}
}
