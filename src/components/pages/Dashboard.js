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

export default class Dashboard extends Component {
	constructor() {
			super();
			this.data = this.data.bind(this);
    }
	data() {
		console.log(DRes.minutes(60));
		//route('/');
	}
	render() {
		return (
			<div>
					<DashboardCard/>
					<button onClick={this.data}>Data</button>
			</div>
		);
	}
}
