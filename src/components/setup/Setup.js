import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import StepZilla from 'react-stepzilla';
import Intro from './Intro';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import ReactBroadcast from "ReactBroadcast";

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

  render() {
    const steps =
    [
      {name: 'Checklist', component: <Intro getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Touchstones', component: <Intro getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Finish', component: <Intro getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
    ]

    return (
      <div>
      <div style="width:100%;padding:10px;">

      <Card shadow={4} style="width:100%">
                <Card.Title>
                    <Card.TitleText>Before we get started!</Card.TitleText>
                </Card.Title>
                <p style="color:black;margin:0px;">Here are a few things you need to check off to insure a proper setup of your Rosetta Home.</p>
                <div style="text-align:left;padding:10px;">

                <div style="padding: 10px;">
                <input type="checkbox" id="s1"></input>
                <label for="s1">Statement #1</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s2"></input>
                <label for="s2">Statement #2</label>
                </div>


                <div style="padding: 10px;">
                <input type="checkbox" id="s3"></input>
                <label for="s3">Statement #3</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s4"></input>
                <label for="s4">Statement #4</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s5"></input>
                <label for="s5">Statement #5</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s6"></input>
                <label for="s6">Statement #6</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s7"></input>
                <label for="s7">Statement #7</label>
                </div>

                <div style="padding: 10px;">
                <input type="checkbox" id="s8"></input>
                <label for="s8">Statement #8</label>
                </div>

                </div>
                <Card.Actions style="text-align:right">
                  <Button raised={true}>Begin</Button>
                </Card.Actions>
            </Card>
            <br></br>
            <Card shadow={4} style="width:100%">
                      <Card.Title>
                          <Card.TitleText>Configuring</Card.TitleText>
                      </Card.Title>
                      <div class="cssload-thecube">
<div class="cssload-cube cssload-c1"></div>
<div class="cssload-cube cssload-c2"></div>
<div class="cssload-cube cssload-c4"></div>
<div class="cssload-cube cssload-c3"></div>
</div>
                      <Card.Actions style="text-align:right">
                      </Card.Actions>
                  </Card>
                  <br></br>
                  <Card shadow={4} style="width:100%">
                            <Card.Title>
                                <Card.TitleText>Touchstones</Card.TitleText>
                            </Card.Title>

                            <Card.Actions style="text-align:right">
                            </Card.Actions>
                        </Card>
            </div> </div>
    )
  }
}
