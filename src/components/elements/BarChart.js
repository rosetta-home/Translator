import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';

import dataservice from '../../service/dataservice';
import theme from '../../theme';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.data = [];
    this.datapoint = this.props.datapoint;
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    if (nextProps.startDateTime !== nextProps.endDateTime) {
    this.data = [];
    dataservice.getData(this.datapoint,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres).then(payload => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
      if (payload) {
        var series = payload['results'][0].series;
        var results = series[0].values;
        for (var i = 0; i < results.length; i++) {
          var currentobj = results[i];
          this.data.push({x:new Date(currentobj[0]),y:currentobj[1],value:currentobj[1]});
        }
        /* Triggers a state change so the nvd3 chart will reload the data */
        this.setState();
      }
    });
    }
  }
  handleColor = (i) => {
    return theme.getColor(this.datapoint,i['value']);
  }
  /* Renders the component */
	render () {
    //const { data } = this.state;
    var data = [{ key: this.datapoint, values: this.data }];
    var enable = this.props.axisEnabled;
    if (enable) {
      return ( <div><NVD3Chart id="barchart" showXAxis={enable} showYAxis={enable} height={400} color={this.handleColor} type="discreteBarChart" datum={data} x="x" y="y" xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d')(new Date(d)), ticks:6,rotateLabels: -35  }}/></div> );
    } else {
      return ( <div><NVD3Chart margin={{top: 0, right: 10, bottom: 0, left: 10}} id="barchart" height={400} showXAxis={enable} showYAxis={enable} color={this.handleColor} type="discreteBarChart" datum={data} x="x" y="y" xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d %H:%M:%S %p')(new Date(d)), ticks:6,rotateLabels: -35  }}/></div> );
    }
  }
}
export default BarChart;
