import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../util';
import reduce from '../../reducers';
import * as actions from '../../actions';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import { bindActionCreators } from 'redux';
import React from 'preact';
import { Sparklines,SparklinesLine } from 'react-sparklines';

function mapStateToProps(state) { return {   graphs: state.graphs }; }
function mapDispatchToProps(dispatch) { return { actions: bindActionCreators(bindActions, dispatch) }; }

@connect(reduce, bindActions(actions))
class SparkGraphLive extends Component {
	constructor(props){
		super(props);
    var nums = [];
    for (var i = 0; i < 25; i++) {
      nums.push((Math.random() * 100) + 1);
    }
		this.data = nums;
    //this.tick = this.tick.bind(this);
    this.id = Math.random().toString(36).substring(2);
    //this.types = this.props.type.split(',');
    //this.nodeID = this.props.nodeID;
    //this.props.createGraph(this.id,this.types,this.nodeID);
	}
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
  render({ todo }) {
    return (
      <div style="padding:10px;">
      <Sparklines data={this.data}>
      <SparklinesLine style={{ fill: "none" }} color="#0277bd"/>
</Sparklines>
			</div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SparkGraphLive);
