import { h, Component } from 'preact';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';
import SparkGraphLive from '../elements/SparkGraphLive';
import Collapsible from 'react-collapsible';
import LiveGraph from '../elements/LiveGraph';
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

import Modal from '../layout/Modal';

import { RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,AreaChart,Area,XAxis,YAxis,CartesianGrid } from 'recharts';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';


export default class Dashboard extends Component {
  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };
  handleResetClick = e => {
    this.setState();
  };
	handleOpenDialog() {
	  this.setState({
	    openDialog: true
	  });
	}
	handleCloseDialog() {
	  this.setState({
	    openDialog: false
	 	});
	}
  toggleModal = () => {
    //ReactBroadcast.broadcast('Modal', 'Dashboard');
    this.setState({
     isOpen: !this.state.isOpen
    });
  }

	constructor(props) {
			super(props);
			this.data = this.data.bind(this);
      var tempfrom = new Date();
      tempfrom.setDate(tempfrom.getDate()-14);
      var tempto = new Date();
			this.state = {  visible:true,
                      from: tempfrom,
	                    to: tempto,
                      date:Date(),
                      isOpen: false};

			authentication.getData2('ieq.co2','2017-07-17T19:46:17Z','2017-07-27T19:46:17Z').then(v => {
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
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
  }
  showModal () {
      this.setState({visible: true});
  }
  hideModal () {
      this.setState({visible: false});
  }
	componentDidMount() {
		if (authentication.getToken() === '') {
      route('/login');
      ReactBroadcast.broadcast('Change_Links', false);
    } else {
      ReactBroadcast.broadcast('Change_Links', true);
      ReactBroadcast.broadcast('SetTitle', 'Dashboard');
    }
	}
	data() { }
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

		const data = [
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
};


var date = moment();
const { from, to,open } = this.state;

var fromValue = moment(from).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
var toValue = moment(to).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';

console.log(fromValue);
console.log(toValue);

	var res = DRes.getResolution(fromValue,toValue);

	return (
			<div>
<div style="padding:10px;">


  {/*    <div className="row">
         <div className="col-6">
          <Card shadow={4} style="width:100%"></Card>
         </div>
         <div className="col-6">
          <Card shadow={4} style="width:100%"></Card>
         </div>
       </div>

       <div className="row">
          <div className="col-6">
            <Card shadow={4} style="width:100%"></Card>
          </div>
          <div className="col-6">
            <Card shadow={4} style="width:100%"></Card>
          </div>
        </div> */}

        <div style="text-align: right;">
        <button onClick={this.toggleModal}>
                  <i class="fa fa-clock-o" aria-hidden="true" style="font-size:36px;color:white;"></i>
                </button>

                </div>

                <Modal show={this.state.isOpen}
                  onClose={this.toggleModal}>

                  <DayPicker
                    numberOfMonths={2}
                    selectedDays={[from, { from, to }]}
                    onDayClick={this.handleDayClick}
                    fixedWeeks/>
                  </Modal>


     <div className="row">
            <div className="col-6">
             <Card shadow={4} style="width:100%">

            <div class="nowcard" style="height:200px;padding: 35px;">
							<h3 style="font-size: 55px;color:#0277bd;">58%</h3>
							<small>Humidity</small>
						</div>


             </Card>
            </div>
            <div className="col-6">
             <Card shadow={4} style="width:100%">


             <div class="nowcard" style="height:200px;padding: 35px;">
               <h3 style="font-size: 55px;color:#0277bd;">558</h3>
               <small>CO2 (PPM)</small>
             </div>



             </Card>
            </div>
          </div>

          <div className="row">
             <div className="col-6">
               <Card shadow={4} style="width:100%">


               <div class="nowcard" style="height:200px;padding: 35px;">
                 <h3 style="font-size: 55px;color:#0277bd;">68°C</h3>
                 <small>Indoor Temperature</small>
               </div>


               </Card>
             </div>
             <div className="col-6">
               <Card shadow={4} style="width:100%">


               <div class="nowcard" style="height:200px;padding: 35px;">
                 <h3 style="font-size: 55px;color:#0277bd;">97°C</h3>
                 <small>Outdoor Temperature</small>
               </div>


               </Card>
             </div>
           </div>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>{configs.title("smart_meter.kw")}</small></Card.TitleText>
       </Card.Title>
       <SparkGraphLive datapoint="smart_meter.kw" startDateTime={fromValue} endDateTime={toValue}/>
       <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
       </Collapsible>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>{configs.title("smart_meter.price")}</small></Card.TitleText>
       </Card.Title>
       <SparkGraphLive datapoint="smart_meter.price" startDateTime={fromValue} endDateTime={toValue}/>
       <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
       </Collapsible>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>{configs.title("weather_station.outdoor_temperature")}</small></Card.TitleText>
       </Card.Title>
       <SparkGraphLive datapoint="weather_station.outdoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
       <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
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
         <Card.TitleText><small>{configs.title("weather_station.indoor_temperature")}</small></Card.TitleText>
       </Card.Title>
       <SparkGraphLive datapoint="weather_station.indoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
       <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
       </Collapsible>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>{configs.title("ieq.co2")}</small></Card.TitleText>
       </Card.Title>
       <SelectorChart datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue} threshold={1000}/>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>Bullet Chart</small></Card.TitleText>
       </Card.Title>
       <BulletChart datapoint="ieq.co2" startDateTime={fromValue} endDateTime={toValue}/>
       <BulletChart datapoint="weather_station.outdoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
       <BulletChart datapoint="weather_station.indoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>{configs.title("weather_station.humidity")}</small></Card.TitleText>
       </Card.Title>
       <SparkGraphLive datapoint="weather_station.humidity" startDateTime={fromValue} endDateTime={toValue}/>
       <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
       </Collapsible>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
     <Card shadow={4} style="width:100%">
       <Card.Title>
         <Card.TitleText><small>Smart Meter</small></Card.TitleText>
       </Card.Title>
       <MultiDPChart datapoints="smart_meter.price,smart_meter.kw_delivered,smart_meter.kw_received,smart_meter.kw" startDateTime={fromValue} endDateTime={toValue}/>
       <Card.Actions style="text-align:right"></Card.Actions>
     </Card>
     <br></br>
      <Card shadow={4} style="width:100%">
        <Card.Title>
          <Card.TitleText><small>Weather Station</small></Card.TitleText>
        </Card.Title>
        <MultiDPChart datapoints="weather_station.humidity,weather_station.outdoor_temperature,weather_station.indoor_temperature" startDateTime={fromValue} endDateTime={toValue}/>
        <Card.Actions style="text-align:right"></Card.Actions>
      </Card>
      <br></br>
			<Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>CO2</small></Card.TitleText>
				</Card.Title>
				<BarChart datapoint="ieq.co2" axisEnabled={false} startDateTime={fromValue} endDateTime={toValue}/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>
      <Card shadow={4} style="width:100%">
				<Card.Title>
					<Card.TitleText><small>CO2</small></Card.TitleText>
				</Card.Title>
				<BarChart datapoint="ieq.co2" axisEnabled={true} startDateTime={fromValue} endDateTime={toValue} dres="12h"/>
				<Card.Actions style="text-align:right"></Card.Actions>
			</Card>
			<br></br>

			</div></div>
		);
	}
}
