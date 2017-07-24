import { h, Component } from 'preact';
import { Redirect } from 'react-router';

export default class NotificationCenter extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <div className="notecontainer">
      <div className="notealert"><span class="closebtn">&times;</span>
      High levels of CO2 have been detected.
      </div>
      <div className="notewarning"><span class="closebtn">&times;</span>
      'Touchstone #23' has lost its conneciton.
      </div>
      </div>
    )
  }
}
