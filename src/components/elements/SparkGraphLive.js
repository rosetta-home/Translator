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
    /* (Promise Object) Fetchs the data for the RH api */
    authentication.getData(this.props.type).then(v => {
      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
  		var series = v['results'][0].series;
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
      {/* Renders the nvd3 chart */}
        <div className="row">
  			   <div className="col-3">
  				   <div className="center-div"><label className="readingLabel">{this.lastValue}</label></div>
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
