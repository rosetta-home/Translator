import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../util';
import reduce from '../../reducers';
import * as actions from '../../actions';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import { bindActionCreators } from 'redux';
import React from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';
import nv from 'nvd3';
import Authentication from '../../service/authservice';

class SparkGraphLive extends Component {
  constructor(props){
    super(props);
    this.data = [];
    /*var now =+new Date();
    for (var i = 0; i < 50; i++) {
       this.data.push({x:now + i * 1000 * 60 * 60 * 24,y:(Math.random() * 100) + 1});
    }*/
    Authentication.getData('ieq.co2').then(v => {
      console.log(v);
  		var series = v['results'][0].series;
      var results = series[0].values;
      var now =+new Date();
      for (var i = 0; i < results.length; i++) {
         this.data.push({x:new Date(results[i][0]),y:results[i][1]});
      }
      this.setState();
		});
  }
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }

	render () {
    return (
      <div>
      <NVD3Chart margin={{top: 10, right: 10, bottom: 10, left: 10}} id="sparklinePlus" type="sparklinePlus" datum={this.data} xTickFormat={(d) => d3.time.format('%H:%M:%S %p')(d)} showLastValue={false}/>
      </div>
    );
  }
}
export default SparkGraphLive;
