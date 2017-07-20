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
    this.click = this.click.bind(this);
  }
  updateDimensions() {
    console.log("updateDimensions");
    this.setState({ width: window.innerWidth - 50});
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  click(data) {
    console.log(data);
  }
 	componentDidMount() { console.log(this); }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  dateformat(date) { return "";}
  valueformat(value) { return Math.round(value);}
  labelformat(label) { return "Value"; }
  dformat(d) { }
  render () {
    	return (
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <LineChart data={this.props.data} onClick={this.click}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis dataKey="date" label="Date" minTickGap={10} name="Date" hide={false} stroke="#0277bd" padding={{ botton: 20 }}/>
            <YAxis domain={['auto', 'auto']} name="Value" hide={false} stroke="#0277bd" padding={{ bottom: 20 }}/>
            <Tooltip formatter={this.valueformat}/>
            <Line dataKey="value" stroke="#000" dot={false} />
            <Brush dataKey="date" tickFormatter={this.dateformat}>
              <LineChart>
                <YAxis hide domain={['auto', 'auto']} />
                <Line dataKey="value" stroke="#000" fill="#000" dot={false} />
              </LineChart>
            </Brush>
          </LineChart>
          </ResponsiveContainer>
      );
    }
}
export default SelectorChart;
