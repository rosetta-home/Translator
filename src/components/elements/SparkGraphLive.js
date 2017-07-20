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
import authentication from '../../service/authservice';

class SparkGraphLive extends Component {
  constructor(props){
    super(props);
    /* Creates data object in the memory */
    this.data = [];
    this.lastValue = 0;
    /* (Promise Object) Fetchs the data for the RH api */
    authentication.getData(this.props.type).then(v => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
  		var series = v['results'][0].series;
      var results = series[0].values;
      var now =+new Date();
      for (var i = 0; i < results.length; i++) {
         this.data.push({x:new Date(results[i][0]),y:results[i][1]});
         this.lastValue = Math.round(results[i][1]);
      }

      /* Triggers a state change so the nvd3 chart will reload the data */
      this.setState();
		});
  }
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }
	render () {
    return (
      <div>
      {/* Renders the nvd3 chart */}
      <div className="row">
  			<div className="col-3">
  				<div className="center-div">
 						<label className="readingLabel">{this.lastValue}</label>
  				</div>
  			</div>
        <div className="col-9">
        {/* TODO: Rendering issues when the data is flow right ot left. Detail pop does not dismiss after cursor is moved.  */}
        <NVD3Chart fill="#ef6c00" stroke="#ef6c00" height={100} margin={{top: 10, right: 30, bottom: 10, left: 10}} id="sparklinePlus" type="sparklinePlus" datum={this.data} xTickFormat={(d) => d3.time.format('%H:%M:%S %p')(d)} showLastValue={false}/>
        </div>
      </div>
    </div>
    );
  }
}
export default SparkGraphLive;
