import { h, Component } from 'preact';
import d3 from 'd3';
import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,LineChart,Line,Brush,YAxis,
Tooltip,XAxis,Surface } from 'recharts';
import moment from 'moment';

import dataservice from '../../service/dataservice';

class BrushElement extends Component {
  //TODO: Hard code for the wind vs ieq.co2 compoent. Cannot really be used yet for other cases.
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    this.dateformat = this.dateformat.bind(this);
    this.datatypes = ['ieq.co2','weather_station.wind.direction'];
    var uris = [];
    this.datatypes.forEach(function(element) {
      uris.push('http://35.167.180.46:8080/data/mean/' + element + '/2017-07-06T12:12:12Z/now/6h');
    });
    this.data = [];
    dataservice.multipromise(uris).then(data => {
      var self = this;
      data.forEach(function(item) {
        if (self.data.length === 0) {
          var series = item['results'][0].series;
    	    var results = series[0].values;
          var name = series[0].name;
    			var tempdata = [];
    			for (var i = 0; i < results.length; i++) {
    			  var current = results[i];
            var temppoint = { date:moment(current[0]).format("MMMM Do h:mm a") };
            temppoint[name] = current[1];
    			  self.data.push(temppoint);
    			}
        } else {
          var series = item['results'][0].series;
    	    var results = series[0].values;
          var name = series[0].name;
          for (var i = 0; i < results.length; i++) {
            var current = results[i];
            self.data[i][name] = current[1];
          }
        }
      });
      this.setState();
    });
  }
  dateformat(date) { return ""; }
  change(range) { this.props.brushChange(this.data.slice(range.startIndex,range.endIndex)); }
  /* Component lifecyle methods */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  render () {
    if (this.data.length === 0) { return ( <div> </div> ); }
    return (
      <div>
        <ResponsiveContainer width='100%' aspect={14.0/2.0}>
          <LineChart data={this.data}>
          <Brush onChange={this.change} tickFormatter={this.dateformat} stroke="#0277bd">
            <LineChart>
              <Line isAnimationActive={false} dataKey="ieq.co2" stroke="#ef6c00" fill="#ef6c00" dot={false}/>
            </LineChart>
          </Brush>
          </LineChart>
        </ResponsiveContainer>
      </div>
      );
    }
}
export default BrushElement;
