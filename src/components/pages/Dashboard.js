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

export default class Dashboard extends Component {
	constructor() {
			super();
			this.data = this.data.bind(this);
			this.dx = [];
			authentication.getData('weather_station.outdoor_temperature').then(v => {
	      /* Once the promise object is resolved then the results are parse and series to used for the sparklinePlus */
	  		var series = v['results'][0].series;
	      var results = series[0].values;
				var dx = [];
				for (var i = 0; i < results.length; i++) {
			    var current = results[i];
			    dx.push({ date:new Date(current[0]), value:current[1]  });
			  }
				this.dx = dx;
	      /* Triggers a state change so the nvd3 chart will reload the data */
	      this.setState();
			});
    }
	data() {
		console.log(DRes.minutes(60));
		//route('/');
	}
	render() {
		return (
			<div>
			<Card shadow={4} style="width:100%">
								<Card.Title>
										<Card.TitleText><small>Sensor Value ID</small></Card.TitleText>
								</Card.Title>
								<SelectorChart data={this.dx}/>
								<Card.Actions style="text-align:right">
								</Card.Actions>
						</Card>
			</div>
		);
	}
}
