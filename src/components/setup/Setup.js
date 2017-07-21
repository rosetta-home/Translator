import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import StepZilla from 'react-stepzilla';
import Intro from './Intro';
import { Card, Button, Grid,Cell } from 'preact-mdl';

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

  componentDidMount() {}

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
      <Card shadow={4} style="width:100%" padding={20}>
                <Card.Title>
                    <Card.TitleText></Card.TitleText>
                </Card.Title>
                <div className='example'>
                  <div className='step-progress' style="padding:20px;">
                    {/*<StepZilla
                      steps={steps}
                      preventEnterSubmission={true}
                      nextTextOnFinalActionStep={"Save"}
                      hocValidationAppliedTo={[3]}
                     />*/}
                  </div>
                </div>
                <Card.Actions style="text-align:right">
                </Card.Actions>
            </Card>
            </div>
    )
  }
}
