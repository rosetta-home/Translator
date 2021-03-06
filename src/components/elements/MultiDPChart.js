import { h, Component } from 'preact';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList,Surface } from 'recharts';
import dataservice from '../../service/dataservice';
import moment from 'moment';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import configs from '../../configs';
import MultiDPChartTooltip from './MultiDPChartTooltip';

class MultiDPChart extends Component {

  constructor(props){
    super(props);
    this.data = [];
    /* Binds functions to compoent for its use */
    this.dateformat = this.dateformat.bind(this);
    this.valueformat = this.valueformat.bind(this);
    this.labelformat = this.labelformat.bind(this);
    this.click = this.click.bind(this);
    /* Gets all data via authservice and multipromise function */
    this.datatypes = this.props.datapoints.split(',');
  }
  click(data) { }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    this.data = [];
    this.datatypes = this.props.datapoints.split(',');
    var uris = dataservice.urlMaker(this.datatypes,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres);
    dataservice.multipromise(uris).then(data => {
      var self = this;
      data.forEach(function(item) {
        if (self.data.length === 0) {
          var series = item['results'][0].series;
          if (series !== undefined) {
            var results = series[0].values;
            var name = series[0].name;
            var tempdata = [];
            for (var i = 0; i < results.length; i++) {
              var current = results[i];
              var temppoint = { date:moment(current[0]).format("MMMM Do h:mm a") };
              temppoint[name] = current[1];
              self.data.push(temppoint);
            }
          }
        } else {
          var series = item['results'][0].series;
          if (series !== undefined) {
            var results = series[0].values;
            var name = series[0].name;
            for (var i = 0; i < results.length; i++) {
              var current = results[i];
              self.data[i][name] = current[1];
            }
          }
        }
      });
      this.setState();
    });
  }
  /* Date formatter for the brush */
  dateformat(date) { return ""; }
  /* Formater for the value on the chart, rounds the value to nearest whole number */
  valueformat(value) { return Math.round(value);}
  labelformat(label) { return "Value"; }
  render () {
    var lines = [];
    var colors = ['#ef6c00','#ff9800','#ffcc80','#81d4fa','#0277bd','#03a9f4','#81d4fa','#ffcc80','#ff9800','#ef6c00'];
    for (var i = 0; i < this.datatypes.length; i++) {
      lines.push(<Line isAnimationActive={false}  dataKey={this.datatypes[i]} stroke={colors[i]} dot={false} />);
    }
    if (this.data.length === 0) {
      return ( <div> </div> );
    }
    return (
        <div>
        <Card shadow={4} className="card_extra">
        <Card.Title>
          <Card.TitleText><small>{configs.title(this.props.datapoint)}</small></Card.TitleText>
        </Card.Title>
        {/* ResponsiveContainer for the linechart with brush to fit in container */}
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        {/* Linchart with the the data and click callback defined */}
        <LineChart data={this.data} onClick={this.click} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          {/* XAxis with value for custom color and padding */}
          <XAxis dataKey="date" label="Date" minTickGap={10} name="Date" hide={false} stroke="#0277bd" padding={{ botton: 20 }}/>
          {/* YAxis with value for custom color and padding */}
          <YAxis domain={['auto', 'auto']} name="Value" hide={false} stroke="#0277bd" padding={{ bottom: 20 }}/>
          {/* Tooltip with callback set for formatting */}
          <Tooltip content={<MultiDPChartTooltip/>}/>
          {/* The actually line for plotting the data values */}
          {lines}
          {/* ReferenceLine which is used as a threshold */}
          <ReferenceLine y={this.props.threshold} label="Threshold" stroke="red" strokeDasharray="5 5" />
          {/* Brush for the data ease, with data key set for the formatter */}
          <Brush tickFormatter={this.dateformat} stroke="#0277bd">
            {/* Brush linchart within */}
            <LineChart>
              {/* YAxis with value for custom color and padding */}
              <YAxis hide domain={['auto', 'auto']} />
              {/* The line for plotting the data values in brush */}
              {lines}
            </LineChart>
          </Brush>
        </LineChart>
        </ResponsiveContainer>
        <Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
        </Card>
        </div>
      );
    }
}
export default MultiDPChart;
