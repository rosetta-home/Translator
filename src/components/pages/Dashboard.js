import { h, Component } from 'preact';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import StepZilla from 'react-stepzilla';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import SparkGraphLive from '../elements/SparkGraphLive';
import '../../style/Card.css';
import Collapsible from 'react-collapsible';
import RHLiveGraph from '../elements/LiveGraph'
import Authentication from '../../service/authservice';
/*
<RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>
<RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>
<button onClick={this.data}>Test</button>
*/
export default class Dashboard extends Component {
	constructor() {
			super();
			this.data = this.data.bind(this);
    }
	data() {

	}
	render() {
		const data = [85, 66, 71, 10, 5, 16, 71, 1, 16, 24, 54, 85, 37, 36, 43, 67, 63, 23, 96, 53, 25,85, 66, 71, 10, 5, 16, 71, 1, 16, 24, 54, 85, 37, 36, 43, 67, 63, 23, 96, 53, 25];
		return (
			<div>
      <Card shadow={4} style="width:100%">
                <Card.Title>
                    <Card.TitleText><small>Outdoor Temperature</small></Card.TitleText>
                </Card.Title>
								<div className="row">
								<div className="col-4">
								 <div className="center-div">
								 <label className="readingLabel">75°C</label>
								 </div>
								</div>
								<div className="col-8">
								<SparkGraphLive/>
								</div>
								</div>
                <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
								<RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>
								</Collapsible>
                <Card.Actions style="text-align:right">
                </Card.Actions>
            </Card>


			</div>
		);
	}
}
