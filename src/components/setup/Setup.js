import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import Intro from './Intro';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import ReactBroadcast from "ReactBroadcast";
import CheckList from './CheckList';
import Touchstone from './Touchstone';
import Done from './Done';
import Wizard from './Wizard';

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = { };
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
    console.log(props);
  }
  render() {
    const steps =
    [
      {name: 'Checklist', component: <CheckList/>},
      {name: 'Touchstones', component: <Touchstone/>},
      {name: 'Touchstones', component: <Touchstone/>},
      {name: 'Touchstones', component: <Touchstone/>},
      {name: 'Finish', component: <Done/>}
    ]
    return (
      <div>
      <div style="width:100%;padding:10px;">
        <Card shadow={4} style="width:100%">
          <Wizard initialStep={1} steps={steps}/>
          <Card.Actions style="text-align:right">
          </Card.Actions>
        </Card>
      </div>
      </div>
    )
  }
}
