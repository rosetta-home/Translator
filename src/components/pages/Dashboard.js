import { h, Component } from 'preact';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';
import { route } from 'preact-router';
import moment from 'moment';

import Collapsible from 'react-collapsible';

import configs from '../../configs';
import ReactBroadcast from '../../service/reactbroadcast';

import SparkGraphLive from '../elements/SparkGraphLive';
import LiveGraph from '../elements/LiveGraph';
import DashboardCard from '../elements/DashboardCard';
import RadialCompare from '../elements/RadialCompare';
import MultiDPChart from '../elements/MultiDPChart';
import BulletChart from '../elements/BulletChart';
import BarChart from '../elements/BarChart';
import SelectorChart from '../elements/SelectorChart';
import NowCard from '../elements/NowCard';
import HeatMap from '../elements/HeatMap';

import Authentication from '../../service/authservice';
import DRes from '../../service/dres';
import authentication from '../../service/authservice';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import SwipeableViews from 'react-swipeable-views';

import CalendarHeatmap from 'react-calendar-heatmap';

class RangePicker extends Component {
		constructor(props) {
			super(props);
			this.state = props.data;
		}
		handleDayClick = day => {
	    const range = DateUtils.addDayToRange(day, this.state);
	    this.setState(range);
	  };
		done = () => {
			this.props.onDone(this.state);
			this.props.callback(this.state);
		}
		close = () => { this.props.close(); }
		componentWillReceiveProps(nextProps) {
			this.setState(nextProps.data);
		}
    render() {
			const { from,to } = this.state;
      return (
        <div>
					<Card shadow={4} style="width:100%">
					<Card.Title>
	          <Card.TitleText>Time Range</Card.TitleText>
	        </Card.Title>
				  <DayPicker
						numberOfMonths={2}
						selectedDays={[from, { from, to }]}
						onDayClick={this.handleDayClick}
					 fixedWeeks/>
			    <Card.Actions style="text-align:right">
						<button className="button" style="background-color: #4CAF50;" onClick={this.done}>Set</button>
						&nbsp;
						<button className="button" style="background-color: #292b2c;" onClick={this.close}>Cancel</button>
					</Card.Actions>
			    </Card>
				</div>
        );
    }
}

class Advanced extends Component {
		constructor(props) {
			super(props);
			this.state = props.data;
		}
		handleDayClick = day => {
	    const range = DateUtils.addDayToRange(day, this.state);
	    this.setState(range);
	  };
		done = () => {
			this.props.onDone(this.state);
			this.props.callback(this.state);
		}
		close = () => { this.props.close(); }
		componentWillReceiveProps(nextProps) {
			this.setState(nextProps.data);
		}
    render() {
			const { from,to } = this.state;
      return (
        <div>
					<Card shadow={4} style="width:100%">
					<Card.Title>
	          <Card.TitleText>Advanced</Card.TitleText>
	        </Card.Title>
				  <DayPicker
						numberOfMonths={2}
						selectedDays={[from, { from, to }]}
						onDayClick={this.handleDayClick}
					 fixedWeeks/>
			    <Card.Actions style="text-align:right">
						<button className="button" style="background-color: #4CAF50;" onClick={this.done}>Run</button>
						&nbsp;
						<button className="button" style="background-color: #292b2c;" onClick={this.close}>Cancel</button>
					</Card.Actions>
			    </Card>
				</div>
        );
    }
}



export default class Dashboard extends Component {
	constructor(props) {
		super(props);
    var tempfrom = new Date();
    tempfrom.setDate(tempfrom.getDate()-1);
    var tempto = new Date();
		this.state = {
			visible:true, from: tempfrom, to: tempto,
      date:Date(), isOpen: false,
			tempindex:1,timerangeindex:3,tempmeasure:'C'
		};
  }
  componentWillUnmount() { ReactBroadcast.broadcast('SetRightItem', null); }
	modalCallBack = (payload) => {
		var newpayload = payload;
		newpayload['timerangeindex'] = 0;
		this.setState(newpayload);
	}
	advancedCallBack = (payload) => {
		console.log(payload);
	}
	componentDidMount() {
		if (authentication.getToken() === '') {
      route('/login');
      ReactBroadcast.broadcast('Change_Links', false);
    } else {
      ReactBroadcast.broadcast('Change_Links', true);
      ReactBroadcast.broadcast('SetTitle', 'Dashboard');
  		var payload = {icon:'fa fa-clock-o',callback:"CallRight"};
  		ReactBroadcast.broadcast('SetRightItem', payload);
  		ReactBroadcast.on("CallRight", item => {
				const { from, to } = this.state;
  			ReactBroadcast.broadcast('OpenModal', { component:RangePicker, callback:this.modalCallBack, props:{'from':from,'to':to} });
  		});
    }
		this.setState();
	}
	segmented = (button) => {
		var id = button.target.id;
		if (id === 'sb-1') {
			var from = new Date();
			from.setDate(from.getDate() - 30);
			this.setState({to:new Date(),from:from,timerangeindex:1});
		}
		if (id === 'sb-2') {
			var from = new Date();
			from.setDate(from.getDate() - 7);
			this.setState({to:new Date(),from:from,timerangeindex:2});
		}
		if (id === 'sb-3') {
			var from = new Date();
			from.setDate(from.getDate() - 1);
			this.setState({to:new Date(),from:from,timerangeindex:3});
		}
		if (id === 'measure-1') {
			this.setState({tempmeasure:'C',tempindex:1});
		}
		if (id === 'measure-2') {
			this.setState({tempmeasure:'F',tempindex:2});
		}
	}
	advanced = () => {
		const { from, to } = this.state;
		ReactBroadcast.broadcast('OpenModal', { component:Advanced, callback:this.advancedCallBack, props:{'from':from,'to':to} });
	}
	render() {
		const { from, to,open,timerangeindex,tempindex,tempmeasure } = this.state;
		var dres = DRes.getResolution(from, to);
		var fromValue = moment(from).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
		var toValue = moment(to).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';



		const styles = {
  		slide: {
    		minHeight: 100,
    		color: '#fff',
  		},
  		slide1: {
    		background: '#FEA900',
  		},
  		slide2: {
    		background: '#B3DC4A',
  		},
  		slide3: {
    		background: '#6AC0FF',
  		},
		};






		return (
			<div>

			<div style="padding:10px;">

			<div class="nowcard" style="text-align:left;padding: 5px;background-color:white;box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);">


			<div className="row" style="margin-right:0px;margin-left:0px;margin-top:0px;">
        <div className="col-6" style=" text-align: left;padding-left: 0px;">
					<label style="font-weight: 400;color: #505050;font-size:15px;margin: 8px;/*font-weight:bold;*/">{moment(from).format('MM/D/YY')} - {moment(to).format('MM/D/YY')}</label>
        </div>
        <div className="col-6" style="text-align:right;padding-right: 0px;">
					<button onClick={this.advanced} style="height: 100%;color: #505050;">Advanced</button>
				</div>
      </div>

			<div class="segmented-control" style="width: 100%; color: #505050;">
				{timerangeindex == 1 ?
					<input type="radio" name="sb" id="sb-1" onClick={this.segmented.bind(this)} checked />
					:
					<input type="radio" name="sb" id="sb-1" onClick={this.segmented.bind(this)}/>
				}
				{timerangeindex == 2 ?
					<input type="radio" name="sb" id="sb-2" onClick={this.segmented.bind(this)} checked />
					:
					<input type="radio" name="sb" id="sb-2" onClick={this.segmented.bind(this)}/>
				}
				{timerangeindex == 3 ?
					<input type="radio" name="sb" id="sb-3" onClick={this.segmented.bind(this)} checked />
					:
					<input type="radio" name="sb" id="sb-3" onClick={this.segmented.bind(this)}/>
				}
				<label for="sb-1" data-value="Last Month" style="margin-bottom:0px;">Last Month</label>
				<label for="sb-2" data-value="Last Week" style="margin-bottom:0px;">Last Week</label>
				<label for="sb-3" data-value="Last 24hrs" style="margin-bottom:0px;">Last 24 hrs</label>
		  </div>
			<br></br>
			<div class="segmented-control" style="width: 100%; color:#505050;">
				{tempindex == 1 ?
					<input type="radio" name="sb1" id="measure-1" onClick={this.segmented.bind(this)} checked />
					:
					<input type="radio" name="sb1" id="measure-1" onClick={this.segmented.bind(this)}/>
				}
				{tempindex == 2 ?
					<input type="radio" name="sb1" id="measure-2" onClick={this.segmented.bind(this)} checked />
					:
					<input type="radio" name="sb1" id="measure-2" onClick={this.segmented.bind(this)}/>
				}
				<label for="measure-1" data-value="Celsius (°C)" style="margin-bottom:0px;">Celsius (°C)</label>
				<label for="measure-2" data-value="Fahrenheit (°F)" style="margin-bottom:0px;">Fahrenheit (°F)</label>
		  </div>

			</div>

			<Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title("ieq.co2")}</small></Card.TitleText>
        </Card.Title>
        <HeatMap datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue} dres={dres}/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

			<Card shadow={4} style="width:100%;margin-top:10px;">
			<SwipeableViews>
      		<NowCard datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
					<NowCard datapoint="weather_station.outdoor_temperature" options={{'unit':tempmeasure}} startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
				  <NowCard datapoint="weather_station.indoor_temperature" options={{'unit':tempmeasure}} startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
  		</SwipeableViews>
			</Card>


      <div className="row" style="margin-right:0px;margin-left:0px;margin-top:10px;">
        <div className="col-6 left">
          <NowCard datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
        </div>
        <div className="col-6 right">
					<NowCard datapoint="weather_station.outdoor_temperature" options={{'unit':tempmeasure}} startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
				</div>
      </div>

			<div className="row" style="margin-right:0px;margin-left:0px;margin-top:10px;">
		    <div className="col-6 left">
		      <NowCard datapoint="weather_station.humidity" startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
		    </div>
		    <div className="col-6 right">
		 			<NowCard datapoint="weather_station.indoor_temperature" options={{'unit':tempmeasure}} startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
				</div>
		  </div>

			<div className="row" style="margin-right:0px;margin-left:0px;margin-top:10px;">
		    <div className="col-6 left">
		      <NowCard datapoint="weather_station.pressure" startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
		    </div>
		    <div className="col-6 right">
		 			<NowCard datapoint="weather_station.uv" options={{'unit':tempmeasure}} startDateTime={fromValue} endDateTime={toValue} dres={dres} map={false}/>
				</div>
		  </div>

			<Card shadow={4} style="width:100%;margin-top:10px;">
				<Card.Title>
			  	<Card.TitleText><small>{configs.title("ieq.co2")}</small></Card.TitleText>
				</Card.Title>
				<SelectorChart datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue} threshold={1000}/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
			</Card>

			<Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>Weather Station</small></Card.TitleText>
        </Card.Title>
        <MultiDPChart datapoints="weather_station.humidity,weather_station.outdoor_temperature,weather_station.indoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

		  <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title("smart_meter.kw")}</small></Card.TitleText>
        </Card.Title>
        <SparkGraphLive datapoint="smart_meter.kw" startDateTime={fromValue} endDateTime={toValue}/>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

		  <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title("smart_meter.price")}</small></Card.TitleText>
        </Card.Title>
        <SparkGraphLive datapoint="smart_meter.price" startDateTime={fromValue} endDateTime={toValue}/>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title("weather_station.outdoor_temperature")}</small></Card.TitleText>
        </Card.Title>
        <SparkGraphLive datapoint="weather_station.outdoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>CO2 vs Wind Direction</small></Card.TitleText>
        </Card.Title>
        <RadialCompare/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title("weather_station.indoor_temperature")}</small></Card.TitleText>
        </Card.Title>
        <SparkGraphLive datapoint="weather_station.indoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

		  <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>Bullet Chart</small></Card.TitleText>
        </Card.Title>
        <BulletChart datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue}/>
        <BulletChart datapoint="weather_station.outdoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
        <BulletChart datapoint="weather_station.indoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title("weather_station.humidity")}</small></Card.TitleText>
        </Card.Title>
        <SparkGraphLive datapoint="weather_station.humidity" startDateTime={fromValue} endDateTime={toValue}/>
        <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
        </Collapsible>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>Smart Meter</small></Card.TitleText>
        </Card.Title>
        <MultiDPChart datapoints="smart_meter.price,smart_meter.kw_delivered,smart_meter.kw_received,smart_meter.kw" startDateTime={fromValue} endDateTime={toValue}/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>

			<Card shadow={4} style="width:100%;margin-top:10px;">
				<Card.Title>
					<Card.TitleText><small>CO2</small></Card.TitleText>
				</Card.Title>
				<BarChart datapoint="ieq.co2" axisEnabled={false} startDateTime={fromValue} endDateTime={toValue}/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
			</Card>

      <Card shadow={4} style="width:100%;margin-top:10px;">
				<Card.Title>
					<Card.TitleText><small>CO2</small></Card.TitleText>
				</Card.Title>
				<BarChart datapoint="ieq.co2" axisEnabled={true} startDateTime={fromValue} endDateTime={toValue} dres="12h"/>
				<Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
			</Card>

			</div>
			</div>
		);
	}
}
