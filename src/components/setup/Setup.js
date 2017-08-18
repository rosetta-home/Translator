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
    this.state = { refresh:true,
      touchstones:[
        {'touchstone_id':'id#1'},
        {'touchstone_id':'id#2'},
        {'touchstone_id':'id#3'}
      ]
    };
    this.pingtimer = setInterval(this.ping, 30000);
    wsp.open().then(() => {
      this.auth();
    });
  }
  /* Component lifecyle function */
  ping = () => {
    console.log("ping");
    var data = { type:'ping', payload:{} };
    const dataStr = JSON.stringify(data)
    wsp.request(dataStr).then(response => {
      console.log(response);
    });
  }
  auth = () => {
    wsp.request('Bearer ' + authservice.getToken()).then(response => {

    });
  }
  componentDidMount() {
    ReactBroadcast.broadcast('SetTitle', 'Setup Rosetta Home');
  }
  componentWillUnmount() {
    clearInterval(this.pingtimer);
    wsp.close().then(() => {

    });
  }
  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }
  updateState = (props) => {
    //console.log(props);
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
  save = () => {
    console.log("save");
    route('/dashboard');
  }

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

    console.log(steps);

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
