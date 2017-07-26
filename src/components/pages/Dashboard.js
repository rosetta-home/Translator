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
import MultiDPChart from '../elements/MultiDPChart';
import BulletChart from '../elements/BulletChart';
import BarChart from '../elements/BarChart';

import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,AreaChart,Area,XAxis,YAxis,CartesianGrid } from 'recharts';

import DayPicker, { DateUtils } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export default class Dashboard extends Component {
	state = {
    from: null,
    to: null,
  };
  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };
  handleResetClick = e => {
    e.preventDefault();
    this.setState({
      from: null,
      to: null,
    });
  };
	constructor() {
			super();
			this.data = this.data.bind(this);
			this.dx = [];
			this.state = {date:Date()};
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
		ReactBroadcast.broadcast('SetTitle', 'Dashboard');
	}
	data() {
		//console.log(DRes.minutes(60));
		//ReactBroadcast.broadcast('SetTitle', 'Dashboard');
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

		/*const data = [
		      {month: '2015.01', a: 4000, b: 2400, c: 2400},
		      {month: '2015.02', a: 3000, b: 1398, c: 2210},
		      {month: '2015.03', a: 2000, b: 9800, c: 2290},
		      {month: '2015.04', a: 2780, b: 3908, c: 2000},
		      {month: '2015.05', a: 1890, b: 4800, c: 2181},
		      {month: '2015.06', a: 2390, b: 3800, c: 2500},
		      {month: '2015.07', a: 3490, b: 4300, c: 2100},
		];
		const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};*/


var date = moment();
const { from, to } = this.state;
	return (
			<div>

			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>Now</small></Card.TitleText>
				</Card.Title>
				{/*<ResponsiveContainer width='100%' aspect={4.0/3.0}>
				<AreaChart data={data} stackOffset="expand"
            margin={{top: 0, right: 10, left: 0, bottom: 0}} >
        <XAxis dataKey="month"/>
        <YAxis tickFormatter={toPercent} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Area type='monotone' dataKey='a' stackId="1" stroke='#03a9f4' fill='#03a9f4' />
        <Area type='monotone' dataKey='b' stackId="1" stroke='#ff9800' fill='#ff9800' />
        <Area type='monotone' dataKey='c' stackId="1" stroke='#d0d0d5' fill='#d0d0d5' />
      	</AreaChart>
				</ResponsiveContainer>*/}
				<div className="RangeExample">
			 {!from && !to && <p>Please select the <strong>first day</strong>.</p>}
			 {from && !to && <p>Please select the <strong>last day</strong>.</p>}
			 {from &&
				 to &&
				 <p style="color:red;">
					 You chose from
					 {' '}
					 {moment(from).format('L')}
					 {' '}
					 to
					 {' '}
					 {moment(to).format('L')}
					 .
					 {' '}<a href="." onClick={this.handleResetClick}>Reset</a>
				 </p>}
			 <DayPicker
				 numberOfMonths={2}
				 selectedDays={[from, { from, to }]}
				 onDayClick={this.handleDayClick}
				 fixedWeeks
			 />
		 </div>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>CO2</small></Card.TitleText>
				</Card.Title>
				<BarChart datapoint="ieq.co2" axisEnabled={true}/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>CO2</small></Card.TitleText>
				</Card.Title>
				<BarChart datapoint="ieq.co2" axisEnabled={false}/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>Bullet Chart</small></Card.TitleText>
				</Card.Title>
				<BulletChart datapoint="ieq.co2"/>
				<BulletChart datapoint="weather_station.outdoor_temperature"/>
				<BulletChart datapoint="weather_station.indoor_temperature"/>
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
					<Card.TitleText><small>Weather Station</small></Card.TitleText>
				</Card.Title>
				<MultiDPChart datapoints="weather_station.humidity,weather_station.outdoor_temperature,weather_station.indoor_temperature"/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
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
