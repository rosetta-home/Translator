import { h, Component } from 'preact';
import { Redirect } from 'react-router';


export default class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    return (
      <div>
        <div style="height:300px;">
        </div>
      </div>
    )
  }
}
