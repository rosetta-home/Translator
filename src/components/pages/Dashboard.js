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
import RadialCompare from '../elements/RadialCompare';

import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer } from 'recharts';

export default class Dashboard extends Component {
	constructor() {
			super();
			this.data = this.data.bind(this);
			this.dx = [];
			authentication.getData2('ieq.co2').then(v => {
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
	componentDidMount() {
		if (authentication.getToken() === '') {
      route('/login');
    }
	}
	data() {
		console.log(DRes.minutes(60));
		//ReactBroadcast.broadcast('updateTitle', 'value1');
		//route('/');
		//this.setState();
	}
	render() {
		const nowdata = [
    { type: 'X', A: 80, B: 110, fullMark: 150 },
    { type: 'Y', A: 58, B: 130, fullMark: 150 },
    { type: 'Z', A: 86, B: 130, fullMark: 150 },
    { type: 'W', A: 99, B: 100, fullMark: 150 }
		];

		const nowdata2 = [
    { type: 'A', A: 20, B: 110, fullMark: 150 },
    { type: 'B', A: 38, B: 130, fullMark: 150 },
    { type: 'C', A: 36, B: 130, fullMark: 150 },
    { type: 'D', A: 39, B: 100, fullMark: 150 }
		];


		return (
			<div>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("weather_station.humidity")}</small></Card.TitleText>
				</Card.Title>
				<SparkGraphLive type="weather_station.humidity"/>
				<Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
           {/*<RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>*/}
				</Collapsible>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>Now</small></Card.TitleText>
				</Card.Title>


				<div className="row">
				<div className="col-6">
				<ResponsiveContainer width='100%' aspect={4.0/3.0}>
				<RadarChart data={nowdata}>
          <Radar name="A" dataKey="A" stroke="#0277bd" fill="#0277bd" fillOpacity={0.5}/>
          <PolarGrid />
          <PolarAngleAxis axisLine={false} dataKey="type" />
        </RadarChart>
				</ResponsiveContainer>
				</div>
				<div className="col-6">
				<ResponsiveContainer width='100%' aspect={4.0/3.0}>
				<RadarChart data={nowdata2}>
          <Radar name="A" dataKey="A" stroke="#0277bd" fill="#0277bd" fillOpacity={0.5}/>
          <PolarGrid />
          <PolarAngleAxis axisLine={false} dataKey="type" />
        </RadarChart>
				</ResponsiveContainer>
				</div>
				</div>

				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("weather_station.indoor_temperature")}</small></Card.TitleText>
				</Card.Title>
				<SparkGraphLive type="weather_station.indoor_temperature"/>
				<Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
           {/*<RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>*/}
				</Collapsible>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>CO2 vs Wind Direction</small></Card.TitleText>
				</Card.Title>
				<RadialCompare/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("weather_station.outdoor_temperature")}</small></Card.TitleText>
				</Card.Title>
				<SparkGraphLive type="weather_station.outdoor_temperature"/>
				<Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
           {/*<RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>*/}
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
           {/*<RHLiveGraph nodeID="0000000081474d35" type="ieq.co2"/>*/}
				</Collapsible>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>{configs.title("ieq.co2")}</small></Card.TitleText>
				</Card.Title>
				<SelectorChart data={this.dx} threshold={1000}/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			</div>
		);
	}
}
