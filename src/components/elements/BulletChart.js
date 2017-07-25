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
    var sub = '';
    if (this.props.datapoint === 'weather_station.outdoor_temperature') { sub = '°C'; }
    if (this.props.datapoint === 'weather_station.indoor_temperature') { sub = '°C'; }
    if (this.props.datapoint === 'weather_station.humidity') { sub = '%'; }
    this.state = {
      title:configs.title(this.props.datapoint),
      subtitle:sub
    }
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  handleMarker = (value) => {
    console.log(value);
  }
  /* Renders the component */
	render () {
    const { title,subtitle } = this.state;
    const data = {
      "title": title,
      "subtitle": subtitle,
      "ranges": [150,225,300],
      "measures": [220],
      "markers": [250]
    };
    return (
      <div>
        <div className="bulletArea">
          <NVD3Chart id="bulletChart" margin={{top: 0, right: 20, bottom: 20}} type="bulletChart" datum={data}/>
        </div>
      </div>
    );
  }
}
export default BulletChart;
