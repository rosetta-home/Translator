import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';
import authentication from '../../service/authservice';
import * as ReactDOM from 'react-dom';
import * as d3 from "d3";
import configs from '../../configs';

class BulletChart extends Component {
  constructor(props){
    super(props);
    /* Finds the subtitle of the bulletchart*/
    var sub = '';
    if (this.props.datapoint === 'weather_station.outdoor_temperature') { sub = '°C'; }
    if (this.props.datapoint === 'weather_station.indoor_temperature') { sub = '°C'; }
    if (this.props.datapoint === 'weather_station.humidity') { sub = '%'; }
    if (this.props.datapoint === 'ieq.co2') { sub = ''; }
    /* Sets the init state of the compoent */
    this.state = {
      title:configs.title(this.props.datapoint),
      subtitle:sub, min:0, mean:0, max:0, current:0
    }
    /* Array for all the uris */
    var uris = [];
    // Temp the range
    var from = '2017-07-05T12:12:12Z';
    var to = '2017-07-06T12:12:12Z';
    uris.push("http://35.167.180.46:8080/data/percentile5/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    uris.push("http://35.167.180.46:8080/data/max/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    uris.push("http://35.167.180.46:8080/data/mean/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    uris.push("http://35.167.180.46:8080/data/last/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    authentication.multipromise(uris).then(data => {
      var max,min,mean,last = 0;
      for (var i = 0; i < data.length; i++) {
        var payload = data[i];
        var series = payload['results'][0].series;
        var results = series[0].values;
        if (i === 0) { min = results[0][1]; }
        if (i === 1) { max = results[0][1]; }
        if (i === 2) { mean = results[0][1]; }
        if (i === 3) { last = results[0][1]; }
      }
      console.log("--------------------------------------------------------");
      console.log("Datapoint: " + this.props.datapoint);
      console.log("Min: " + min);
      console.log("Max: " + max);
      console.log("Mean: " + mean);
      console.log("Current: " + last);
      this.setState({ min:min, max:max, mean:mean, current:last });
    });
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  handleColor = (d,i) => { return '#0277bd'; }
  /* Renders the component */
	render () {
    const { title,subtitle,min,mean,max,current } = this.state;
    const data = { "title": title, "subtitle": subtitle, "ranges": [min,mean,max], "measures": [current], "markerLines":[current] };
    return (
      <div>
        <div className="bulletArea">
          <NVD3Chart id="bulletChart" fill="red" margin={{top: 0, right: 20, bottom: 20}} type="bulletChart" datum={data}/>
        </div>
      </div>
    );
  }
}
export default BulletChart;
