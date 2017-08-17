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
    const wsp = new WebSocketAsPromised(Configs.ws_url());
    wsp.open().then(() => {


      wsp.request('Bearer ' + authservice.getToken()).then(response => {

        console.log(response);

      });

    });
  }
  /* Component lifecyle function */
  componentDidMount() {
    ReactBroadcast.broadcast('SetTitle', 'Setup Rosetta Home');
  }
  componentWillUnmount() {}
  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }
  updateState = (props) => {
    //console.log(props);
    //this.setState({refresh:false});

  }
  updateTouchstone = (payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve("Good");
      }, 3000);
    });
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
