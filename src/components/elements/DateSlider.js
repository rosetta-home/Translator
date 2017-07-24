import { h, Component } from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';
import authentication from '../../service/authservice';
import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,LineChart,Line,Brush,YAxis,
Tooltip,XAxis,Surface } from 'recharts';
import moment from 'moment';


import Slider from 'react-rangeslider';

// To include the default styles



class DateSlider extends Component {


  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 0,
      date: Date(),
      min:0,
      max:1
    }
  }

  handleChange = (value) => {
    if (this.props.value.length !== 0) {
    var index = value;
    var obj = this.props.value[index];
    this.props.dateChange(obj,value);
    }
  }
  componentWillReceiveProps(props) {
    //console.log(props);
    var date = moment().format("MMMM Do h:mm a");
    if (props.value.length !== 0) {
       date = props.value[props.current].date;
       this.setState({
         value: props.current,
         date: date,
         min:0,
         max:props.value.length - 1
       });
    } else {
      this.setState({
        value: 0,
        date: date,
        min:0,
        max:0
      });
    }

  }
  render () {
    const { value,date,min,max } = this.state;

    return (
        <div>
        <div className='slider-group'>
        <div className='slider-horizontal' style="padding:10px;">
        <div className='value'>{date}</div>
         <Slider
           min={min}
           max={max}
           value={value}
           onChange={this.handleChange}
         />
       </div>
       </div>
          </div>
      );
    }
}
export default DateSlider;
