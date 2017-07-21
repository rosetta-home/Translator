import { h, Component } from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';
import authentication from '../../service/authservice';
import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,LineChart,Line,Brush,YAxis,
Tooltip,XAxis,Surface } from 'recharts';
import moment from 'moment';

class RadialCompare extends Component {
  state = {
    x: 10,
    y: 10
  };
  constructor(props){
    super(props);
    this.dx = [];
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
 	componentDidMount() { console.log(this); }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  render () {
    const data = [
    { angle: 'E', value: 120,  fullMark: 150 },
    { angle: '60', value: 120, fullMark: 150 },
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
];
    	return (
        <div>
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <RadarChart data={data}>
                <Radar name="Mike" dataKey="value" stroke="#343434" fill="#343434" fillOpacity={0.6}/>
                <PolarGrid />
                <PolarAngleAxis dataKey="angle" />
                <PolarRadiusAxis/>
              </RadarChart>
          </ResponsiveContainer>
          </div>
      );
    }
}
export default RadialCompare;
