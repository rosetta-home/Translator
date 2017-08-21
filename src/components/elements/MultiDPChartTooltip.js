import { h, Component } from 'preact';
import configs from '../../configs';
// Custom tooltip for the line chart
export default class SelectorChartTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { date:null, values:[] };
  }
  // Will get the props and update with the current values
  componentWillReceiveProps(nextProps) {
    // Gets the props payload, if not selected it empty array / if selected will be populated
    var payloadarray = this.props['payload'];
    if (payloadarray.length !== 0) {
      var data = payloadarray[0].payload;
      var points = [];
      for (var i = 0, j = Object.keys(data).length; i < j; i++) {
        var id = Object.keys(data)[i];
        var objtemp = {};
        objtemp[id] = data[id];
        points.push(objtemp);
      }
      this.setState({date:data['date'],values:points});
    }
  }
  // Renders the compoent
  render() {
    // Gets the the date and value from the current state
    const { date, values } = this.state;
    var items = [];

    for (var i = 0, j = values.length; i < j; i++) {
      var obj = values[i];
      var key = Object.keys(obj);
      var row;
      if (key[0] !== 'date') {
        row = configs.title(key[0]) + ' - ' + Math.round(obj[key[0]]);
      } else {
        row = date;
      }
      items.push(<small>{row}</small>);
      items.push(<br></br>);
    }
    return (
      <div style="width:200px;height:100px;background-color:lightgray;border-radius:5px;text-align:center">
        {items}
      </div>
    )
  }
}
