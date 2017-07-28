import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';
import * as ReactDOM from 'react-dom';
import * as d3 from "d3";
import configs from '../../configs';
import dataservice from '../../service/dataservice';

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
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    var uris = dataservice.bulletUri(this.props.datapoint,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres);

    dataservice.multipromise(uris).then(data => {
      var max,min,mean,last = 0;
      var valid = true;
      for (var i = 0; i < data.length; i++) {
        var payload = data[i];
        var series = payload['results'][0].series;
        if (series !== undefined) {
        var results = series[0].values;
          if (i === 0) { min = results[0][1]; }
          if (i === 1) { max = results[0][1]; }
          if (i === 2) { mean = results[0][1]; }
          if (i === 3) { last = results[0][1]; }
        } else {
          valid = false;
        }
      }
      if (valid) {
        this.setState({ min:min, max:max, mean:mean, current:last });
      }
    });
  }
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
