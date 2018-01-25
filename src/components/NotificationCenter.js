import { h, Component } from 'preact';
import { Redirect } from 'react-router';
import ReactBroadcast from "reactbroadcast";

export default class NotificationCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications:[]
    }
  }
  componentDidMount() {
    ReactBroadcast.on('Add_Notification', payload => {
      var { notifications } = this.state;
      notifications.push(payload);
      this.setState({
        notifications:notifications
      });
    });
  }
  componentWillUnmount() {}
  render() {
    const { notifications } = this.state;
    if (notifications.length === 0) { return ( <div> </div> ); }


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
