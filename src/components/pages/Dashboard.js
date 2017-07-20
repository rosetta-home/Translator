import { h, Component } from 'preact';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import StepZilla from 'react-stepzilla';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import SparkGraphLive from '../elements/SparkGraphLive';
import '../../style/Card.css';
import Collapsible from 'react-collapsible';
import RHLiveGraph from '../elements/LiveGraph';
import DashboardCard from '../elements/DashboardCard';
import Authentication from '../../service/authservice';
import { route } from 'preact-router';
import DRes from '../../service/dres';
import SelectorChart from '../elements/SelectorChart';
import authentication from '../../service/authservice';
import configs from '../../configs';
import moment from 'moment';
import ReactBroadcast from 'ReactBroadcast';
export default class Dashboard extends Component {
	constructor() {
			super();
			this.data = this.data.bind(this);
			this.dx = [];
			authentication.getData('ieq.co2').then(v => {
	      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
	  		var series = v['results'][0].series;
	      var results = series[0].values;
				var dx = [];
				for (var i = 0; i < results.length; i++) {
			    var current = results[i];
			    dx.push({ date:moment(current[0]).format("MMMM Do h:mm a"), value:current[1]  });
			  }
				this.dx = dx;
	      /* Triggers a state change so the nvd3 chart will reload the data */
	      this.setState();
			});
    }
	data() {
		console.log(DRes.minutes(60));
		ReactBroadcast.broadcast('updateTitle', 'value1');
		//route('/');
		//<button onClick={this.data}>Test</button>
	}
	render() {
		return (
			<div>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText></Card.TitleText>
				</Card.Title>

				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("weather_station.outdoor_temperature")}</small></Card.TitleText>
				</Card.Title>
				<SparkGraphLive type="weather_station.outdoor_temperature"/>
				<Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
           <RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>
				</Collapsible>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("ieq.co2")}</small></Card.TitleText>
				</Card.Title>
				<SparkGraphLive type="ieq.co2"/>
				<Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
           <RHLiveGraph nodeID="0000000081474d35" type="ieq.co2"/>
				</Collapsible>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("ieq.co2")}</small></Card.TitleText>
				</Card.Title>
				<SelectorChart data={this.dx}/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			</div>
		);
	}
}
