import { h, Component } from 'preact';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList,Surface } from 'recharts';

class SelectorChart extends Component {

  constructor(props){
    super(props);
    /* Binds functions to compoent for its use */
    this.dateformat = this.dateformat.bind(this);
    this.valueformat = this.valueformat.bind(this);
    this.labelformat = this.labelformat.bind(this);
    this.click = this.click.bind(this);
  }
  click(data) { console.log(data); }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  /* Date formatter for the brush */
  dateformat(date) { return ""; }
  /* Formater for the value on the chart, rounds the value to nearest whole number */
  valueformat(value) { return Math.round(value);}
  labelformat(label) { return "Value"; }
  render () {
    return (
        <div>
        {/* ResponsiveContainer for the linechart with brush to fit in container */}
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        {/* Linchart with the the data and click callback defined */}
        <LineChart data={this.props.data} onClick={this.click} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          {/* XAxis with value for custom color and padding */}
          <XAxis dataKey="date" label="Date" minTickGap={10} name="Date" hide={false} stroke="#0277bd" padding={{ botton: 20 }}/>
          {/* YAxis with value for custom color and padding */}
          <YAxis domain={['auto', 'auto']} name="Value" hide={false} stroke="#0277bd" padding={{ bottom: 20 }}/>
          {/* Tooltip with callback set for formatting */}
          <Tooltip formatter={this.valueformat}/>
          {/* The actually line for plotting the data values */}
          <Line dataKey="value" stroke="#000" dot={false} />
          {/* ReferenceLine which is used as a threshold */}
          <ReferenceLine y={this.props.threshold} label="Threshold" stroke="red" strokeDasharray="3 3" />
          {/* Brush for the data ease, with data key set for the formatter */}
          <Brush dataKey="date" tickFormatter={this.dateformat}>
            {/* Brush linchart within */}
            <LineChart>
              {/* YAxis with value for custom color and padding */}
              <YAxis hide domain={['auto', 'auto']} />
              {/* The line for plotting the data values in brush */}
              <Line dataKey="value" stroke="#000" fill="#000" dot={false} />
            </LineChart>
          </Brush>
        </LineChart>
        </ResponsiveContainer>
        </div>
      );
    }
}
export default SelectorChart;
