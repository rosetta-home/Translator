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
  return {
    messages: state.todos,
    isConnected : true
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bindActions, dispatch)
  };
}



class LiveGraph extends Component {
	constructor(props){
		super(props);
		this.manager = new RosettaHomeGraph(props);
		this.data = [{ values: [], key: 'Current Temp.', color: '#ef6c00' }];
		this.refresh = this.refresh.bind(this);
    this.tick = this.tick.bind(this);
    this.interval = setInterval(this.tick, 1000);
	}
 	componentDidMount() {

  }
 	componentWillUnmount() { }
	refresh() {

	}
  tick() {
    this.data[0].values = this.props.messages;
    this.setState();
	}
  render({ todo }) {
    function getX(d) { return d['text'].x; };
    function getY(d) { return d['text'].y };
    return (
			<div>
			<NVD3Chart id="lineChart" type="lineChart" datum={this.data} x={getX} y={getY}/>
			</div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LiveGraph);
