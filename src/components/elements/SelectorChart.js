import { h, Component } from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList,Surface } from 'recharts';

class SelectorChart extends Component {

  constructor(props){
    super(props);
    this.dateformat = this.dateformat.bind(this);
    this.valueformat = this.valueformat.bind(this);
    this.labelformat = this.labelformat.bind(this);
    this.dformat = this.dformat.bind(this);
  }
 	componentDidMount() { console.log(this); }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  dateformat(date) { return "";}
  valueformat(value) { return Math.round(value);}
  labelformat(label) { return "Value"; }
  dformat(d) {
    console.log(d);
    return "A";
  }
  //tickFormatter={this.dformat}
  render () {
    	return (
        <LineChart width={window.innerWidth - 50} height={300} data={this.props.data}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis type="number" domain={['dataMin', 'dataMax']} dataKey="date" scale="time"/>
            <YAxis domain={['auto', 'auto']} label="Value" />
            <Tooltip formatter={this.valueformat}/>
            <Line dataKey="value" stroke="#ef6c00" dot={false} />
            <Brush dataKey="date" tickFormatter={this.dateformat}>
              <AreaChart>
                <YAxis hide domain={['auto', 'auto']} />
                <Area dataKey="value" stroke="#ef6c00" fill="#ef6c00" dot={false} />
              </AreaChart>
            </Brush>
          </LineChart>
      );
    }
}
export default SelectorChart;
