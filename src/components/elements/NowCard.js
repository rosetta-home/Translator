import { h, Component } from 'preact';
import { Card, Dialog, Button, Icon, Grid,Cell } from 'preact-mdl';
import { route } from 'preact-router';
import NVD3Chart from 'react-nvd3';
import moment from 'moment';

import dataservice from '../../service/dataservice';
import theme from '../../theme';
import configs from '../../configs';

Array.prototype.sum = function() { return this.reduce(function(a,b){return a+b;}); };

export default class NowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue:0,
      data:[],
      min:0,
      mean:0,
      max:0
    };
    this.lastValueEnding = '';
    this.isC = true;
    this.isTemp = false;
  }
  /* Component lifecyle function */
  componentDidMount() { }
  componentWillUnmount() { }
  componentWillReceiveProps(nextProps) {
    /* Resets the ending value */
    this.lastValueEnding = '';
    /* Checks the props to see what the datapoint is */
    if (this.props.datapoint === 'weather_station.outdoor_temperature') {
      var options = nextProps.options;
      this.isTemp = true;
      if (options.unit !== undefined) {
        if (options.unit === 'F') {
          this.lastValueEnding = '°F';
          this.isC = false;
        } else {
          this.lastValueEnding = '°C';
          this.isC = true;
        }
      }
    }
    if (this.props.datapoint === 'weather_station.indoor_temperature') {
      var options = nextProps.options;
      this.isTemp = true;
      if (options.unit !== undefined) {
        if (options.unit === 'F') {
          this.lastValueEnding = '°F';
          this.isC = false;
        } else {
          this.lastValueEnding = '°C';
          this.isC = true;
        }
      }
    }
    if (this.props.datapoint === 'weather_station.humidity') { this.lastValueEnding = '%'; }
    if (this.props.datapoint === 'smart_meter.kw') { this.lastValueEnding = 'kw'; }
    if (this.props.datapoint === 'smart_meter.price') { this.lastValueEnding = '¢'; }
    /* Uses the props and checks to make data service request */
    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,nextProps.dres).then(payload => {
      var series = payload['results'][0].series;
      if (series !== undefined) {
        var results = series[0].values;
        /* Init the values and array */
        var dx = [];
        var current = 0;
        var allvals = [];
        var min = null;
        var max = null;
        /* Goes through the results */
        for (var i = 0; i < results.length; i++) {
           /* Gets the current object in array */
           var currentobj = results[i];
           var val;
           if (this.isTemp) {
             if (this.isC) {
               val = currentobj[1]
             } else {
               val = currentobj[1] * 9 / 5 + 32;
             }
           } else {
             val = currentobj[1]
           }

           dx.push({x:new Date(currentobj[0]),y:10,value:val});
           current = Math.round(val);
           allvals.push(current);

           if (min === null) {
             min = currentobj;
           } else {
             if (min[1] > current) {
               min = currentobj;
             }
           }

           if (max === null) {
             max = currentobj;
           } else {
             if (max[1] < current) {
               max = currentobj;
             }
           }
        }
        /* Update the state of the component */
        this.setState({
          data:dx,
          currentValue:
          current,
          min:min,
          mean:Math.round(allvals.sum() / allvals.length),
          max:max
        });
      }
    });
  }
  handleColor = (i) => {
    /* If true, is sparkline and return black */
    if (!this.props.map) { return "black"; }
    /* If heatmap type gets the color from the theme */
    return theme.getColor(this.props.datapoint,i['value']);
  }
  more = () => {
    route('/more');
  }
	render() {
    const { currentValue,data,min,mean,max } = this.state;
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
        <div className="row" style="margin-right:0px;margin-left:0px;">
           <div className="col-12" style="padding-top: 10px;padding-bottom: 0px;">
             <div class="nowcard" style="padding-bottom:0px;padding-right:15px;padding-left:15px;">
                <h3 style="line-height:1.0;margin-bottom:0;font-size: 55px;color:rgb(41, 43, 44);font-weight: 200;">{currentValue + this.lastValueEnding}</h3>
                <small style="color: rgb(0, 0, 0);opacity: 1;">{configs.title(this.props.datapoint)}</small>
             </div>
           </div>
        </div>
        {this.props.map === false &&
        <div>
        <div className="row" style="margin-bottom:5px;margin-right:0px;margin-left:0px;">
          <div className="col-12 full" style="padding-top: 0px;padding-bottom: 0px;">
            <small style="font-size: 80%;font-weight: lighter;">Avg: {mean + this.lastValueEnding}</small>
          </div>
        </div>
        <div className="row" style="margin-bottom:5px;margin-right:0px;margin-left:0px;">
          <div className="col-6 full" style="padding-top: 0px;padding-bottom: 0px;">
            <small style="color:#0277bd;font-size: 80%;font-weight: lighter;">Low: {Math.round(min[1]) + this.lastValueEnding}</small>
            <br></br>
            <small style="color:#0277bd;font-size: 60%;">{moment(min[0]).format('L')}</small>
          </div>
          <div className="col-6 full" style="padding-top: 0px;padding-bottom: 0px;">
            <small style="color:#ef6c00;font-size: 80%;font-weight: lighter;">High: {Math.round(max[1]) + this.lastValueEnding}</small>
            <br></br>
            <small style="color:#ef6c00;font-size: 60%;">{moment(max[0]).format('L')}</small>
          </div>
        </div>
        </div>
        }

        <div className="row" style="margin-bottom:5px;margin-right:0px;margin-left:0px;">
          <div className="col-6 full" style="padding-top: 0px;padding-bottom: 0px;">
            <small style="color:#0277bd;font-size: 80%;font-weight: lighter;">Low: {Math.round(min[1]) + this.lastValueEnding}</small>
            <br></br>
            <small style="color:#0277bd;font-size: 60%;">{moment(min[0]).format('L')}</small>
          </div>
          <div className="col-6 full" style="padding-top: 0px;padding-bottom: 0px;">
            <small style="color:#ef6c00;font-size: 80%;font-weight: lighter;">High: {Math.round(max[1]) + this.lastValueEnding}</small>
            <br></br>
            <small style="color:#ef6c00;font-size: 60%;">{moment(max[0]).format('L')}</small>
          </div>
        </div>

        <div className="row" style="margin-right:0px;margin-left:0px;">
           <div className="col-12 full" style="padding-top: 0px;padding-bottom: 0px;">
              <NVD3Chart showLastValue={false} showXAxis={false} showYAxis={false}  margin={{top: 10, right: 10, bottom: 10, left: 10}} height={50}  color={this.handleColor} type={type} datum={dd} x="x" y={y} xAxis={{ tickFormat: (d) => d3.time.format('%Y-%m-%d %H:%M:%S %p')(new Date(d)), ticks:6,rotateLabels: -35  }}/>
           </div>
        </div>
        {this.props.map === true &&
        <div className="row" style="background: -webkit-linear-gradient(right, #ef6c00,#ff9800,#ffcc80, #81d4fa,#03a9f4,#0277bd);margin-top:5px;margin-right:10px;margin-left:10px;">
          <div className="col-4 full" style="padding-left: 5px;text-align: left;padding-top: 0px;padding-bottom: 0px;">
            <small><b>Low</b></small>
          </div>
          <div className="col-4 full" style="text-align: center;padding-top: 0px;padding-bottom: 0px;">
            <small><b>Normal</b></small>
          </div>
          <div className="col-4 full" style="padding-right: 5px;text-align: right;padding-top: 0px;padding-bottom: 0px;">
            <small><b>High</b></small>
          </div>
        </div>
        }
        <Card.Actions>
            <button onClick={this.more}><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>
      </div>
    );
	}

}
