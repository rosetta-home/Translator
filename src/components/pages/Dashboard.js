import { h, Component } from 'preact';
import ReactDOM from 'preact-compat';
import NVD3Chart from 'react-nvd3';
import StepZilla from 'react-stepzilla';
import { Card, Button, Grid } from 'preact-mdl';
import SparkGraphLive from '../elements/SparkGraphLive';
import '../../style/Card.css';
import Collapsible from 'react-collapsible';
import RHLiveGraph from '../elements/LiveGraph'

/*
<SparkGraphLive/>
<Collapsible style="color:#ef6c00;" trigger="Live">
<RHLiveGraph nodeID="0000000081474d35" type="weather_station.indoor_temperature,weather_station.outdoor_temperature"/>
</Collapsible>*/
/*<Card shadow={4} style="width:100%">
          <Card.Title>
              <Card.TitleText><small>Outside Temperature</small></Card.TitleText>
          </Card.Title>
          <RHLiveGraph nodeID="0000000081474d35" type="weather_station.indoor_temperature,weather_station.outdoor_temperature"/>
          <Card.Actions style="text-align:right">
          </Card.Actions>
      </Card>*/


export default class Dashboard extends Component {
	render() {
		return (
			<div>
      <Card shadow={4} style="width:100%">
                <Card.Title>
                    <Card.TitleText><small>Outdoor Temperature</small></Card.TitleText>
                </Card.Title>

                <label style="color:#0277bd;font-size:35px;">75 °C</label>



                <SparkGraphLive/>



                <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
                  <RHLiveGraph nodeID="0000000081474d35" type="weather_station.outdoor_temperature"/>
                </Collapsible>
                <Card.Actions style="text-align:right">
                </Card.Actions>
            </Card>
            <br></br>
            <Card shadow={4} style="width:100%">
                      <Card.Title>
                          <Card.TitleText><small>Indoor Temperature</small></Card.TitleText>
                      </Card.Title>
                      <SparkGraphLive/>
                      <Collapsible style="color:#ef6c00;padding-right:20px;" trigger="Live" transitionTime={100}>
                        <RHLiveGraph nodeID="0000000081474d35" type="weather_station.indoor_temperature"/>
                      </Collapsible>
                      <Card.Actions style="text-align:right">
                      </Card.Actions>
                  </Card>
                  <br></br>
			</div>
		);
	}
}
