import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';

import dataservice from '../../service/dataservice';
import theme from '../../theme';

import { Card, Button, Grid,Cell } from 'preact-mdl';
import configs from '../../configs';
import Collapsible from 'react-collapsible';


class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = { data:[] };

  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    if (nextProps.startDateTime !== nextProps.endDateTime) {
    this.data = [];
    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres).then(payload => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
      if (payload) {
        var series = payload['results'][0].series;
        var results = series[0].values;
        var dx = [];
        for (var i = 0; i < results.length; i++) {
          // Gets current object in array
          var currentobj = results[i];
          dx.push({x:new Date(currentobj[0]),y:currentobj[1],value:currentobj[1]});
        }
        /* Triggers a state change so the nvd3 chart will reload the data */
        this.setState({data:dx});
      }
    });
    }
  }
  handleColor = (i) => {
    // Gets the color from the theme class
    return theme.getColor(this.props.datapoint,i['value']);
  }
  /* Renders the component */
	render () {
    const { data } = this.state;
    var payload = [{ key: this.props.datapoint, values: data }];
    var enable = this.props.axisEnabled;
    if (enable) {
      return (
        <div>
        <Card shadow={4} style="width:100%;margin-top:10px;">
  				<Card.Title>
  					<Card.TitleText><small>{configs.title(this.props.datapoint)}</small></Card.TitleText>
  				</Card.Title>
          <NVD3Chart id="barchart" showXAxis={enable} showYAxis={enable} height={400} color={this.handleColor} type="discreteBarChart" datum={payload} x="x" y="y" xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d')(new Date(d)), ticks:6,rotateLabels: -35  }}/>
          <Card.Actions>
              <button><small style="font-weight: lighter;">More</small></button>
          </Card.Actions>
  			</Card>
        </div>
      );
    } else {
      return (
        <div>
        <Card shadow={4} style="width:100%;margin-top:10px;">
  				<Card.Title>
  					<Card.TitleText><small>{configs.title(this.props.datapoint)}</small></Card.TitleText>
  				</Card.Title>
          <NVD3Chart margin={{top: 0, right: 10, bottom: 0, left: 10}} id="barchart" height={400} showXAxis={enable} showYAxis={enable} color={this.handleColor} type="discreteBarChart" datum={payload} x="x" y="y" xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d %H:%M:%S %p')(new Date(d)), ticks:6,rotateLabels: -35  }}/>
          <Card.Actions>
              <button><small style="font-weight: lighter;">More</small></button>
          </Card.Actions>
  			</Card>
        </div>
      );
    }
  }
}
export default BarChart;
