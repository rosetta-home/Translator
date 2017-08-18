import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import Intro from './Intro';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import ReactBroadcast from "ReactBroadcast";
import CheckList from './CheckList';
import Touchstone from './Touchstone';
import Done from './Done';
import Wizard from './Wizard';
import { route } from 'preact-router';
import Configs from '../../configs';
import authservice from '../../service/authservice';
import WebSocketAsPromised from '../../service/wsp';

const wsp = new WebSocketAsPromised(Configs.ws_url());

export default class Setup extends Component {
  constructor(props) {
    super(props);
    //Defaults and the touchstones linked to the hub
    this.state = { refresh:true,
      touchstones:[
        {'touchstone_id':'5T7aal0wKVc56fvidAuITqOd6hBYEf0AsTAVwaAp'},
        {'touchstone_id':'y9yVpwNlbTn45vGpViqDyugY0Sco5NPUQLdClslm'},
        {'touchstone_id':'FijevwmkmViMctxlxlOje73IctAgzE0ycE6mT6Zs'}
      ]
    };
    //Setting the timer to ping the server and keep connection open
    this.pingtimer = setInterval(this.ping, 30000);
    wsp.open().then(() => {
      this.auth();
    });
  }
  /* Component lifecyle function */
  ping = () => {
    // Pings the websocket to keep it alive
    var data = { type:'ping', payload:{} };
    const dataStr = JSON.stringify(data)
    wsp.request(dataStr).then(response => {
      console.log(response);
    });
  }
  // Auth the web socket connect
  auth = () => {
    wsp.request('Bearer ' + authservice.getToken()).then(response => {
    });
  }
  //Component lifecyle methods
  componentDidMount() {
    ReactBroadcast.broadcast('SetTitle', 'Setup Rosetta Home');
  }
  componentWillUnmount() {
    clearInterval(this.pingtimer);
    wsp.close().then(() => {

    });
  }
  // Temp, but would get the list of touchstone connected to hub and reconfig the wizard for setup
  updateState = (props) => {
    this.setState({refresh:false});
  }
  updateTouchstone = (payload) => {
    console.log(payload);
    clearInterval(this.pingtimer);
    this.pingtimer = setInterval(this.ping, 30000);
    var data = {
      type:'configure',
      payload:{}
    };
    const dataStr = JSON.stringify(data);
    return wsp.request(dataStr);
  }
  // Once the touchstones are saved they are re-routed to the dsahboard
  save = () => {
    route('/dashboard');
  }
  // Renders the setup wizard
  render() {
    const { refresh,touchstones } = this.state;
    var steps;
    if (refresh) {
      steps =
      [
        {name: 'Checklist', component: <CheckList getTouchstones={this.updateState}/>}
      ];
    } else {
      var touch = [];
      var step = [{name: 'Checklist', component: <CheckList getTouchstones={this.updateState}/>}];
      for (var i = 0; i < touchstones.length; i++) {
        touch.push({name:'Touchstone', component:<Touchstone updateTouchstone={this.updateTouchstone} id={touchstones[i].touchstone_id}/>});
      }
      steps = step.concat(touch);
      steps.push({name: 'Done', component: <Done/>});
    }
    return (
      <div>
      <div style="width:100%;padding:10px;">
        <Card shadow={4} style="width:100%">
          <Wizard initialStep={1} steps={steps} save={this.save}/>
          <Card.Actions style="text-align:right">
          </Card.Actions>
        </Card>
      </div>
      </div>
    )
  }
}
