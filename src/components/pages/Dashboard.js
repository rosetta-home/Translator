import { h, Component } from 'preact';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import StepZilla from 'react-stepzilla';
import { Card, Button } from 'preact-mdl';
import SparkGraphLive from '../elements/SparkGraphLive';
import '../../style/Card.css';
import Collapsible from 'react-collapsible';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
      <Card shadow={4} style="width:100%">
                <Card.Title>
                    <Card.TitleText><small>Outside Temperature</small></Card.TitleText>
                </Card.Title>
                <SparkGraphLive/>
                <Collapsible style="color:#ef6c00;" trigger="Live">
       <p>This is the collapsible content. It can be any element or React component you like.</p>
       <p>It can even be another Collapsible component. Check out the next section!</p>
     </Collapsible>
                <Card.Actions style="text-align:right">
                    <Button style="color:#ef6c00;" primary></Button>
                </Card.Actions>
            </Card>
			</div>
		);
	}
}
