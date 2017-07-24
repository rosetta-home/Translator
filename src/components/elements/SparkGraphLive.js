import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';
import authentication from '../../service/authservice';

class SparkGraphLive extends Component {
  constructor(props){
    super(props);
    /* Creates data object in the memory */
    this.data = [];
    this.lastValue = 0;
    this.lastValueEnding = '';
    /* Checks the props type and assigns the correct endding value if needed. */
    if (this.props.type === 'weather_station.outdoor_temperature') { this.lastValueEnding = '°C'; }
    if (this.props.type === 'weather_station.indoor_temperature') { this.lastValueEnding = '°C'; }
    if (this.props.type === 'weather_station.humidity') { this.lastValueEnding = '%'; }

    /* (Promise Object) Fetchs the data for the RH api */
    authentication.getData(this.props.type).then(payload => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
  		var series = payload['results'][0].series;
      var results = series[0].values;
      for (var i = 0; i < results.length; i++) {
         var currentobj = results[i];
         this.data.push({x:new Date(currentobj[0]),y:currentobj[1]});
         this.lastValue = Math.round(currentobj[1]);
      }
      /* Triggers a state change so the nvd3 chart will reload the data */
      this.setState();
		});
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  /* Renders the component */
	render () {
    return (
      <div>
      {/* Renders the nvd3 chart creates a row */}
        <div className="row">
           {/* */}
  			   <div className="col-3">
  				   <div className="center-div"><label className="readingLabel">{this.lastValue + this.lastValueEnding}</label></div>
  			   </div>
           <div className="col-9">
             <NVD3Chart stroke="#ef6c00" height={80} margin={{top: 10, right: 30, bottom: 10, left: 10}} id="sparklinePlus" type="sparklinePlus" datum={this.data} xTickFormat={(d) => d3.time.format('%H:%M:%S %p')(d)} showLastValue={false}/>
           </div>
        </div>
      </div>
    );
  }
}
export default SparkGraphLive;
