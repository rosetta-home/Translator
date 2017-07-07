import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../util';
import reduce from '../../reducers';
import * as actions from '../../actions';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import { bindActionCreators } from 'redux';
import satori_sdk from "satori-sdk-js";

function mapStateToProps(state) { return {   graphs: state.graphs }; }
function mapDispatchToProps(dispatch) { return { actions: bindActionCreators(bindActions, dispatch) }; }

@connect(reduce, bindActions(actions))
class RHLiveGraph extends Component {
	constructor(props){
		super(props);
		this.data = [{values: [], key: '', color: '#ffffff' }];
    this.tick = this.tick.bind(this);
    this.id = Math.random().toString(36).substring(2);
    this.types = this.props.type.split(',');
    this.nodeID = this.props.nodeID;
    this.props.createGraph(this.id,this.types,this.nodeID);

	 const nodeID = "0000000081474d35";
	 const endpoint = "wss://open-data.api.satori.com";
	 const appKey = "da4F19eb331E6465a6C206DE6c9cE2dc";
	 const channel = "rosetta-home";
	 this.rtm = new satori_sdk(endpoint, appKey);
	 this.rtm.on("enter-connected", function() { console.log("Connected to rosetta-home via satori.js!"); });
	 this.rtm.on("leave-connected", function() { console.log("Disconnected to rosetta-home via satori.js!"); });
	 this.subscription = this.rtm.subscribe("where", satori_sdk.SubscriptionMode.SIMPLE, {
		 filter: 'SELECT * FROM `rosetta-home` WHERE tags.node_id=\"'+ nodeID +'\"',
	 });
	 var self = this;
	 this.subscription.on('rtm/subscription/data', function (pdu) {
		 pdu.body.messages.forEach(function (msg) {
			 self.props.addData(msg);
		 });
	 });
	 this.rtm.start();


	}
  tick() { this.props.graphAddPoint(this.id); }
 	componentDidMount() {
		this.timer = setInterval(this.tick, 1000);
	}
 	componentWillUnmount() {
		console.log("Unmounted Component");
		this.rtm.stop();
    clearInterval(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    var grs = nextProps.graphs[this.id];
    if (grs.datum.length != 0) { this.data = grs.datum; }
  }
  render({ todo }) {
    return (
			<div>
			<NVD3Chart id="lineChart" type="lineChart" datum={this.data} xAxis={{ tickFormat: (d) => d3.time.format('%H:%M:%S %p')(new Date(d)), ticks:4,rotateLabels: -35  }} x="x" y="y"/>
			</div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RHLiveGraph);
