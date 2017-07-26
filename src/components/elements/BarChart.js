import { h, Component } from 'preact';
import NVD3Chart from 'react-nvd3';
import React from 'preact';
import authentication from '../../service/authservice';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.data = [];
    if (this.props.axisEnabled) {
      authentication.getData('ieq.co2').then(payload => {
        /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
    		var series = payload['results'][0].series;
        var results = series[0].values;
        for (var i = 0; i < results.length; i++) {
           var currentobj = results[i];
           this.data.push({x:new Date(currentobj[0]),y:currentobj[1]});
        }
        /* Triggers a state change so the nvd3 chart will reload the data */
        this.setState();
  		});
    } else {
      authentication.getData2('ieq.co2').then(payload => {
        /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
    		var series = payload['results'][0].series;
        var results = series[0].values;
        for (var i = 0; i < results.length; i++) {
           var currentobj = results[i];
           this.data.push({x:new Date(currentobj[0]),y:currentobj[1]});
        }
        /* Triggers a state change so the nvd3 chart will reload the data */
        this.setState();
  		});
    }
  }
  /* React component lifecyle functions */
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  /* Renders the component */
	render () {
    var data = [{ key: "CO2", values: this.data }];
    var context = {
      getColor: function(i){
        var color = '';
        var currentval = i['y'];

        if (0 < currentval && currentval < 600) {
          color = '#0277bd';
        }
        if (600 < currentval && currentval < 800) {
          color = '#03a9f4';
        }
        if (800 < currentval && currentval < 1000) {
          color = '#81d4fa';
        }
        if (1000 < currentval && currentval < 1200) {
          color = '#ffcc80';
        }
        if (1200 < currentval && currentval < 1400) {
          color = '#ff9800';
        }
        if (currentval > 1400) {
          color = '#ef6c00';
        }

        return color;
      }
    };

    var enable = this.props.axisEnabled;
    if (enable) {
      return (
        <div>
        <NVD3Chart id="barchart" showXAxis={enable} showYAxis={enable} context={context} height={400} color={{name:'getColor', type:'function'}} type="discreteBarChart" datum={data} x="x" y="y" xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d')(new Date(d)), ticks:6,rotateLabels: -35  }}/>
        </div>
      );
    } else {
    return (
      <div>
      <NVD3Chart margin={{top: 0, right: 10, bottom: 0, left: 10}} id="barchart" showXAxis={enable} showYAxis={enable} context={context} height={400} color={{name:'getColor', type:'function'}} type="discreteBarChart" datum={data} x="x" y="y" xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d %H:%M:%S %p')(new Date(d)), ticks:6,rotateLabels: -35  }}/>
      </div>
    );
    }
  }
}
export default BarChart;
