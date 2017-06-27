import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';


import { Button } from 'preact-mdl';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import satori_sdk from "satori-sdk-js";
import ReactOutsideEvent from 'react-outside-event';
import { bindActionCreators } from 'redux';


class RosettaHomeGraph {
    constructor (props) {
        this.props = props;
    }
		getData() {
			return [{x:1,y:1},{x:2,y:2}];
		}
}

function mapStateToProps(state) {
  console.log(state);
  return {
    graphs: state.graphs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bindActions, dispatch)
  };
}


@connect(reduce, bindActions(actions))
class RHLiveGraph extends Component {
	constructor(props){
		super(props);
		this.manager = new RosettaHomeGraph(props);
		this.data = [{values: [], key: '', color: '#ffffff' }];
		this.refresh = this.refresh.bind(this);
    this.tick = this.tick.bind(this);
    this.id = Math.random().toString(36).substring(2);
    this.types = this.props.type.split(',');
    this.nodeID = this.props.nodeID;
    this.props.createGraph(this.id,this.types,this.nodeID);
	}
 	componentDidMount() { }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {

    if (nextProps.graphs[this.id].datum.length != 0) {
      console.log(nextProps.graphs[this.id].datum);
      this.data = nextProps.graphs[this.id].datum;
      this.setState();
    }

  }//xAxis={{ tickFormat: (d) => new Date(d) }}
	refresh() { }
  tick() { }
  render({ todo }) {
    return (
			<div>
			<NVD3Chart id="lineChart" type="lineChart" datum={this.data}  x="x" y="y"/>
      <Button onClick={this.refresh}>Log DOM</Button>
			</div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RHLiveGraph);
