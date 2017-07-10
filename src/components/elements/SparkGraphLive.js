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
function mapStateToProps(state) { return {   graphs: state.graphs }; }
function mapDispatchToProps(dispatch) { return { actions: bindActionCreators(bindActions, dispatch) }; }

@connect(reduce, bindActions(actions))
class SparkGraphLive extends Component {

  //tick() { this.props.graphAddPoint(this.id); }
 	componentDidMount() {
		//this.timer = setInterval(this.tick, 1000);
  }
 	componentWillUnmount() {
    //clearInterval(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    //var grs = nextProps.graphs[this.id];
    //if (grs.datum.length != 0) { this.data = grs.datum; }
  }
	render ({ todo }) {
    const {width, height, data, interpolation} = this.props;

    const el = d3.select(ReactFauxDOM.createElement('svg'))
      .attr(this.props)
      .attr('data', null)

    const x = d3.scale.linear()
      .range([0, width])
      .domain(d3.extent(data, (d, i) => i))

    const y = d3.scale.linear()
      .range([height, 0])
      .domain(d3.extent(data, (d) => d))

    const line = d3.svg.line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .interpolate(interpolation)

    el.append('path')
      .datum(data)
      .attr({
        key: 'sparkline',
        className: 'sparkline',
        d: line
      })

    return el.node().toReact()
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SparkGraphLive);
