import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import Intro from './Intro';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import ReactBroadcast from "ReactBroadcast";
import CheckList from './CheckList';
import Wizard from './Wizard';

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      email: '',
      gender: '',
      savedToCloud: false
    };
  }

  componentDidMount() {
    ReactBroadcast.broadcast('SetTitle', 'Setup Rosetta Home');
  }

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
  }

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
      {name: 'Checklist', component: <CheckList update={(props) => (this.updateState(props))}/>},
      {name: 'Touchstones', component: <Intro update={(props) => (this.updateState(props))}/>},
      {name: 'Finish', component: <Intro update={(props) => (this.updateState(props))}/>}
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
