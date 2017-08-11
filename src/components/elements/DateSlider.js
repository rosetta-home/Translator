import { h, Component } from 'preact';
import d3 from 'd3';
import moment from 'moment';
import Slider from 'react-rangeslider';

class DateSlider extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 0,
      date: Date(),
      min:0,
      max:1
    };
  }
  handleChange = (value) => {
    /* Handles the changes the slider props */
    if (this.props.value.length !== 0) {
      var obj = this.props.value[value];
      this.props.dateChange(obj,value);
    }
  }
  componentWillReceiveProps(props) {
    /* As the slider is change the parent is triggering than update props */
    var date = moment().format("MMMM Do h:mm a");
    if (props.value.length !== 0) {
      date = props.value[props.current].date;
      this.setState({ value: props.current,date: date,min:0, max:props.value.length - 1 });
    } else {
      this.setState({ value: 0,date: date,min:0,max:0 });
    }
  }
  render () {
    /* Renders the slider for the date range */
    const { value,date,min,max } = this.state;
    return (
        <div>
          <div className='slider-group'>
            <div className='slider-horizontal' style="padding:10px;">
              <div className='value'>{date}</div>
              {/* Slider with the call back to update the radial graph in the parent of this componenet */}
              <Slider min={min} max={max} value={value} onChange={this.handleChange}/>
            </div>
          </div>
        </div>
      );
    }
}
export default DateSlider;
