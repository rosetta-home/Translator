import { h, Component } from 'preact';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList,Surface } from 'recharts';
import dataservice from '../../service/dataservice';
import moment from 'moment';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import configs from '../../configs';
import SelectorChartTooltip from './SelectorChartTooltip';

class SelectorChart extends Component {

  constructor(props){
    super(props);
    /* Binds functions to compoent for its use */
    this.dateformat = this.dateformat.bind(this);
    this.valueformat = this.valueformat.bind(this);
    this.labelformat = this.labelformat.bind(this);
    this.click = this.click.bind(this);
    this.data = [];
  }
  click(data) { }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    this.data = [];
    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres).then(payload => {
      var series = payload['results'][0].series;
      if (series !== undefined) {
      var results = series[0].values;
      var data = [];
      for (var i = 0; i < results.length; i++) {
        var current = results[i];
        data.push({ date:moment(current[0]).format("MMMM Do h:mm a"), value:current[1]  });
      }
      this.data = data;
      /* Triggers a state change so the nvd3 chart will reload the data */
      this.setState();
      }
    });
  }
  /* Date formatter for the brush */
  dateformat(date) { return ""; }
  /* Formater for the value on the chart, rounds the value to nearest whole number */
  valueformat(value) { return Math.round(value);}
  labelformat(label) { return "Value"; }
  render () {
    return (
        <div>
        <Card shadow={4} style="width:100%;margin-top:10px;">
  			<Card.Title>
  			  <Card.TitleText><small>{configs.title(this.props.datapoint)}</small></Card.TitleText>
  			</Card.Title>
        {/* ResponsiveContainer for the linechart with brush to fit in container */}
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        {/* Linchart with the the data and click callback defined */}
        <LineChart data={this.data} onClick={this.click} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          {/* XAxis with value for custom color and padding */}
          <XAxis dataKey="date" tickFormatter={this.valueformat} label="Date" minTickGap={10} name="Date" hide={false} stroke="#0277bd" padding={{ botton: 20 }}/>
          {/* YAxis with value for custom color and padding */}
          <YAxis domain={['auto', 'auto']} tickFormatter={this.valueformat} name="Value" hide={false} stroke="#0277bd" padding={{ bottom: 20 }}/>
          {/* Tooltip with callback set for formatting */}
          <Tooltip content={<SelectorChartTooltip/>}/>
          {/* The actually line for plotting the data values */}
          <Line isAnimationActive={false}  dataKey="value" stroke="#ef6c00" dot={false} />
          {/* ReferenceLine which is used as a threshold */}
          <ReferenceLine y={this.props.threshold} label="Threshold" stroke="red"/>
          {/* Brush for the data ease, with data key set for the formatter */}
          <Brush dataKey="date" tickFormatter={this.dateformat} stroke="#0277bd">
            {/* Brush linchart within */}
            <LineChart>
              {/* YAxis with value for custom color and padding */}
              <YAxis hide domain={['auto', 'auto']} />
              {/* The line for plotting the data values in brush */}
              <Line isAnimationActive={false} dataKey="value" stroke="#ef6c00" fill="#ef6c00" dot={false} />
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
export default SelectorChart;
