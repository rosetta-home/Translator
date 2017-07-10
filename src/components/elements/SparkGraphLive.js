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

class SparkGraphLive extends Component {
  constructor(props){
    super(props);
    this.data = [];
    var now =+new Date();
    for (var i = 0; i < 50; i++) {
       this.data.push({x:now + i * 1000 * 60 * 60 * 24,y:(Math.random() * 100) + 1});
    }
  }
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
  defaultChartConfig(containerId, data) {

  }
	render ({ todo }) {
    return (
      <div>
      <NVD3Chart margin={{top: 10, right: 10, bottom: 10, left: 10}} id="sparklinePlus" type="sparklinePlus" datum={this.data} showLastValue={false}/>
      </div>
    );
  }
}
export default SparkGraphLive;
