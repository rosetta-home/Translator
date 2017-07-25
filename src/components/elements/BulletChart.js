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
      subtitle:sub,
      min:0,
      mean:0,
      max:0,
      current:0
    }

    //http://35.167.180.46:8080/data/last/ieq.co2/2017-07-05T12:12:12Z/2017-07-06T12:12:12Z/30d
    var uris = [];

    var from = '2017-07-05T12:12:12Z';
    var to = '2017-07-06T12:12:12Z';

    uris.push("http://35.167.180.46:8080/data/min/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    uris.push("http://35.167.180.46:8080/data/max/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    uris.push("http://35.167.180.46:8080/data/mean/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");
    uris.push("http://35.167.180.46:8080/data/last/"+ this.props.datapoint + "/" + from + "/" + to + "/30d");


    authentication.multipromise(uris).then(data => {

      console.log(data);

    });


  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  handleMarker = (value) => {
    console.log(value);
  }
  handleColor = (d,i) => {
    return '#0277bd';
  }
  /* Renders the component */
	render () {
    const { title,subtitle } = this.state;
    const data = {
      "title": title,
      "subtitle": subtitle,
      "ranges": [150,225,300],
      "measures": [220],
      "markerLines":[100]
    };
    return (
      <div>
        <div className="bulletArea">
          <NVD3Chart color={this.handleColor} id="bulletChart" fill="red" margin={{top: 0, right: 20, bottom: 20}} type="bulletChart" datum={data}/>
        </div>
      </div>
    );
  }
}
export default BulletChart;
