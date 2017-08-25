import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import Intro from './Intro';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import ReactBroadcast from '../../service/reactbroadcast';
import CheckList from './CheckList';
import Touchstone from './Touchstone';
import Done from './Done';
import Wizard from './Wizard';
import { route } from 'preact-router';
import Configs from '../../configs';
import authservice from '../../service/authservice';
import WebSocketAsPromised from '../../service/wsp';
import ProgressBar from '../elements/ProgressBar';

const wsp = new WebSocketAsPromised(Configs.ws_url());

export default class Setup extends Component {
  constructor(props) {
    super(props);
    //Defaults and the touchstones linked to the hub
    this.state = {
      account:JSON.parse(authservice.getAccount())
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
    var payload = {icon:'fa fa-question-circle-o',callback:"CallRight"};
    ReactBroadcast.broadcast('SetRightItem', payload);
    ReactBroadcast.on("CallRight", item => {
      route('/help');
    });
  }
  componentWillUnmount() {
    ReactBroadcast.broadcast('SetRightItem', null);
    clearInterval(this.pingtimer);
    wsp.close().then(() => {

    });
  }
  updateTouchstone = (payload) => {
    clearInterval(this.pingtimer);
    this.pingtimer = setInterval(this.ping, 30000);
    var data = {
      type:'configure',
      payload:payload
    };
    const dataStr = JSON.stringify(data);
    return wsp.request(dataStr);
  }
  saveTouchstone = (id,name) => {
    console.log("Saving: " + id + " with name: " + name);
    clearInterval(this.pingtimer);
    this.pingtimer = setInterval(this.ping, 30000);
    var data = {
      type:'touchstone_name',
      payload:{
        'id':id,
        'name':name
      }
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
    const { account } = this.state;
    var touchstones = account.hardware.ieq;
    var steps;
    var touch = [];
    var step = [{name: 'Checklist', component: <CheckList getTouchstones={this.updateState}/>}];
    for (var i = 0; i < touchstones.length; i++) {
      touch.push({name:'Touchstone', component:<Touchstone saveTouchstone={this.saveTouchstone} updateTouchstone={this.updateTouchstone} id={touchstones[i].id}/>});
    }
    steps = step.concat(touch);
    steps.push({name: 'Done', component: <Done/>});
    return (
      <div>
      <div style="width:100%;padding:10px;">
        <Card shadow={4} style="width:100%">
          <Wizard initialStep={1} steps={steps} save={this.save}/>
          <Card.Actions>
          </Card.Actions>
        </Card>
      </div>
      </div>
    )
  }
}
