import { h, Component } from 'preact';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';
import NVD3Chart from 'react-nvd3';

import dataservice from '../../service/dataservice';
import theme from '../../theme';
import configs from '../../configs';

export default class NowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue:0,
      data:[]
    };
    this.lastValueEnding = '';
  }
  componentDidMount() {

	}
  componentWillUnmount() {

  }
  componentWillReceiveProps(nextProps) {
    this.lastValueEnding = '';
    if (this.props.datapoint === 'weather_station.outdoor_temperature') { this.lastValueEnding = '°C'; }
    if (this.props.datapoint === 'weather_station.indoor_temperature') { this.lastValueEnding = '°C'; }
    if (this.props.datapoint === 'weather_station.humidity') { this.lastValueEnding = '%'; }
    if (this.props.datapoint === 'smart_meter.kw') { this.lastValueEnding = 'kw'; }
    if (this.props.datapoint === 'smart_meter.price') { this.lastValueEnding = '¢'; }

    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,'12h').then(payload => {
      var series = payload['results'][0].series;
      if (series !== undefined) {
        var results = series[0].values;
        var dx = [];
        var current = 0;
        for (var i = 0; i < results.length; i++) {
           var currentobj = results[i];
           dx.push({x:new Date(currentobj[0]),y:10,value:currentobj[1]});
            current = Math.round(currentobj[1]);
        }
        this.setState({data:dx,currentValue:current});
      }
    });
  }
  handleColor = (i) => {

    return theme.getColor(this.props.datapoint,i['value']);
  }
	render() {
    const { currentValue,data } = this.state;
    var dd;
    var y;
    if (this.props.map) {
      dd = [{ key: 'this.datapoint', values: data }];
      y = "y";
    } else {
      dd = data;
      y = "value";
    }
    var type = this.props.map ? 'discreteBarChart' : 'sparklinePlus';
		return (
      <div>
      <Card shadow={4} style="width:100%">
        <Card.Title>
          <Card.TitleText></Card.TitleText>
        </Card.Title>
        <div className="row" style="margin-right:0px;margin-left:0px;">
           <div className="col-12" style="padding-top: 0px;padding-bottom: 0px;">
             <div class="nowcard" style="padding-bottom:15px;padding-right:15px;padding-left:15px;">
                <h3 style="font-size: 55px;color:#0277bd;">{currentValue + this.lastValueEnding}</h3>
                <small>{configs.title(this.props.datapoint)}</small>
             </div>
           </div>
        </div>
        <div className="row" style="margin-right:0px;margin-left:0px;">
           <div className="col-12 full" style="padding-top: 0px;padding-bottom: 0px;">
              <NVD3Chart showLastValue={false} showXAxis={false} showYAxis={false}  margin={{top: 0, right: 10, bottom: 0, left: 10}} height={50}  color={this.handleColor} type={type} datum={dd} x="x" y={y} xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d %H:%M:%S %p')(new Date(d)), ticks:6,rotateLabels: -35  }}/>
           </div>
        </div>
        <Card.Actions style="text-align:right"></Card.Actions>
      </Card>
      </div>
    );
	}

}
