import { h, Component } from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';
import authentication from '../../service/authservice';
import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,LineChart,Line,Brush,YAxis,
Tooltip,XAxis,Surface } from 'recharts';
import moment from 'moment';
import BrushElement from './BrushElement';
import DateSlider from './DateSlider';

class RadialCompare extends Component {
  constructor(props){
    super(props);
    this.dx = [];
    this.state = {
      value: [],
      current:0,
      raddata:[
        { angle: 'E', value: 0,  fullMark: 150 },
        { angle: '60', value: 0, fullMark: 150 },
        { angle: '30', value: 0, fullMark: 150 },
        { angle: 'N', value: 0, fullMark: 150 },
        { angle: '330', value: 0, fullMark: 150 },
        { angle: '300', value: 0, fullMark: 150 },
        { angle: 'W', value: 0, fullMark: 150 },
        { angle: '240', value: 0, fullMark: 150 },
        { angle: '210', value: 0, fullMark: 150 },
        { angle: 'S', value: 0, fullMark: 150 },
        { angle: '150', value: 0, fullMark: 150 },
        { angle: '120', value: 0, fullMark: 150 }
      ]
    }
    authentication.getData('ieq.co2').then(v => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
      var series = v['results'][0].series;
      var results = series[0].values;
      var dx = [];
      for (var i = 0; i < results.length; i++) {
        var current = results[i];
        dx.push({ date:moment(current[0]).format("MMMM Do h:mm a"), value:current[1]  });
      }
      this.dx = dx;
      /* Triggers a state change so the nvd3 chart will reload the data */
      this.setState();
    });
  }
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  handleBrushChange = (value) => {
    this.setState({
      value:value,
      current:0,
      raddata:[
        { angle: 'E', value: 0,  fullMark: 150 },
        { angle: '60', value: 0, fullMark: 150 },
        { angle: '30', value: 0, fullMark: 150 },
        { angle: 'N', value: 0, fullMark: 150 },
        { angle: '330', value: 0, fullMark: 150 },
        { angle: '300', value: 0, fullMark: 150 },
        { angle: 'W', value: 0, fullMark: 150 },
        { angle: '240', value: 0, fullMark: 150 },
        { angle: '210', value: 0, fullMark: 150 },
        { angle: 'S', value: 0, fullMark: 150 },
        { angle: '150', value: 0, fullMark: 150 },
        { angle: '120', value: 0, fullMark: 150 }
      ]
    });
  }
  handleDateChange = (value,current) => {
    var rad = [];
    var current_direction = value['weather_station.wind.direction'];
    var current_co2 = value['ieq.co2'];

    //console.log(Math.round(current_direction / 30));

    //var radarray = ['E','60','30','N','330','300','W','240','210','S','150','120'];





  if (current_direction < 90 && current_direction > 60) {
    rad.push({ angle: 'E', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: 'E', value: 0,  fullMark: 150 });
  }

  if (current_direction < 60 && current_direction > 30) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '60', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '60', value: 0,  fullMark: 150 });
  }

  if (current_direction < 30 && current_direction > 0) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '30', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '30', value: 0,  fullMark: 150 });
  }

  if (current_direction < 360 && current_direction > 330) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: 'N', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: 'N', value: 0,  fullMark: 150 });
  }

  if (current_direction < 330 && current_direction > 300) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '330', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '330', value: 0,  fullMark: 150 });
  }

  if (current_direction < 300 && current_direction > 270) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '300', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '300', value: 0,  fullMark: 150 });
  }

  if (current_direction < 270 && current_direction > 240) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: 'W', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: 'W', value: 0,  fullMark: 150 });
  }

  if (current_direction < 240 && current_direction > 210) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '240', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '240', value: 0,  fullMark: 150 });
  }

  if (current_direction < 210 && current_direction > 180) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '210', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '210', value: 0,  fullMark: 150 });
  }

  if (current_direction < 180 && current_direction > 150) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: 'S', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: 'S', value: 0,  fullMark: 150 });
  }

  if (current_direction < 150 && current_direction > 120) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '150', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '150', value: 0,  fullMark: 150 });
  }

  if (current_direction < 120 && current_direction > 90) {
    var count = rad.length - 1;
    rad[count].value = current_co2;
    rad.push({ angle: '120', value: current_co2,  fullMark: 150 });
  } else {
    rad.push({ angle: '120', value: 0,  fullMark: 150 });
  }

    this.setState({
      current: current,
      raddata:rad
    });
  }

  render () {
      const { value,raddata,current } = this.state;
    	return (
        <div>
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <RadarChart data={raddata}>
          <Radar name="Mike" isAnimationActive={false} dataKey="value" stroke="#ef6c00" fill="#ef6c00" fillOpacity={0.6}/>
          <PolarGrid />
          <PolarAngleAxis dataKey="angle" stroke="#0277bd"/>
          <PolarRadiusAxis stroke="#0277bd"/>
        </RadarChart>
        </ResponsiveContainer>
        <BrushElement brushChange={this.handleBrushChange}/>
        <DateSlider value={value} current={current} dateChange={this.handleDateChange}/>
        </div>
      );
  }
}
export default RadialCompare;
