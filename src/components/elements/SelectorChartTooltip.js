import { h, Component } from 'preact';
// Custom tooltip for the line chart
export default class SelectorChartTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { date:null, value:null };
  }
  // Will get the props and update with the current values
  componentWillReceiveProps(nextProps) {
    // Gets the props payload, if not selected it empty array / if selected will be populated
    var payloadarray = this.props['payload'];
    if (payloadarray.length !== 0) {
      // Gets the data from the payload
      var data = payloadarray[0].payload;
      // Changes the payload in the state.
      this.setState(data);
    }
  }
  // Renders the compoent
  render() {
    // Gets the the date and value from the current state
    const { date, value } = this.state;
    return (
      <div style="width:200px;height:50px;background-color:lightgray;border-radius:5px;text-align:center">
        <small>{date}</small>
        <br></br>
        <small>{value}</small>
      </div>
    )
  }
}
