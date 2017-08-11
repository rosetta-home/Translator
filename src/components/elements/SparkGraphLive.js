import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';
import dataservice from '../../service/dataservice';

import { Card, Button, Grid,Cell } from 'preact-mdl';
import configs from '../../configs';
import Collapsible from 'react-collapsible';

class SparkGraphLive extends Component {
  constructor(props){
    super(props);
    /* Creates data object in the memory */
    this.data = [];
    this.lastValue = 0;
    this.lastValueEnding = '';
    this.round = true;
  }
  roundNumber = (n, digits) => {
    if (digits === undefined) {
        digits = 0;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return (Math.round(n) / multiplicator).toFixed(2);
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    if (this.props.datapoint === 'weather_station.outdoor_temperature') { this.lastValueEnding = '°C'; }
    if (this.props.datapoint === 'weather_station.indoor_temperature') { this.lastValueEnding = '°C'; }
    if (this.props.datapoint === 'weather_station.humidity') { this.lastValueEnding = '%'; }
    if (this.props.datapoint === 'smart_meter.kw') {
      this.lastValueEnding = 'kw';
      this.round = false;
    }
    if (this.props.datapoint === 'smart_meter.price') {
      this.lastValueEnding = '¢';
      this.round = false;
    }
    /* (Promise Object) Fetchs the data for the RH api */
    this.data = [];
    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres).then(payload => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
      var series = payload['results'][0].series;
      if (series !== undefined) {
        var results = series[0].values;
        for (var i = 0; i < results.length; i++) {
           var currentobj = results[i];
           this.data.push({x:new Date(currentobj[0]),y:currentobj[1]});
           if (this.round) {
             this.lastValue = Math.round(currentobj[1]);
           } else {
             this.lastValue = this.roundNumber(currentobj[1],2);
           }
        }
        /* Triggers a state change so the nvd3 chart will reload the data */
        this.setState();
      }
    });
  }
  /* Renders the component */
	render () {
    return (
      <div>
      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title(this.props.datapoint)}</small></Card.TitleText>
        </Card.Title>
        {/* Renders the nvd3 chart creates a row */}
        <div className="row">
           {/* */}
  			   <div className="col-3">
  				   <div className="center-div"><label className="readingLabel">{this.lastValue + this.lastValueEnding}</label></div>
  			   </div>
           <div className="col-9">
             <NVD3Chart color={["#ef6c00"]} height={80} margin={{top: 10, right: 30, bottom: 10, left: 20}} id="sparklinePlus" type="sparklinePlus" datum={this.data} xTickFormat={(d) => d3.time.format('%H:%M:%S %p')(d)} showLastValue={false}/>
           </div>
        </div>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>
      </div>
    );
  }
}
export default SparkGraphLive;
