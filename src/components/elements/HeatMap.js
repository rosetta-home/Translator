import { h, Component } from 'preact';
import { Card, Button, Grid,Cell } from 'preact-mdl';
import configs from '../../configs';

import CalendarHeatmap from 'react-calendar-heatmap';
import dataservice from '../../service/dataservice';
import theme from '../../theme';

export default class HeatMap extends Component {
  constructor(props) {
    super(props);
    // Init state
    this.state = {
      data:[]
    };
  }
  componentWillReceiveProps(nextProps) {
    // Uses the props from the dashboard to make a data request.
    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,'1d').then(payload => {
      var series = payload['results'][0].series;
      if (series !== undefined) {
        var results = series[0].values;
        // Creates a new array.
        var dx = [];
        for (var i = 0; i < results.length; i++) {
           // Gets the current value in forloop.
           var currentobj = results[i];
           // Adds to the dx array.
           dx.push({date:currentobj[0],count:currentobj[1]});
        }
        // Updates the state of the component.
        this.setState({data:dx});
      }
    });
  }
	render() {
    // Gets the data from the state.
    const { data } = this.state;
		return (
			<div>
      <Card shadow={4} style="width:100%;margin-top:10px;">
        <Card.Title>
          <Card.TitleText><small>{configs.title(this.props.datapoint)}</small></Card.TitleText>
        </Card.Title>
        <div style="padding-left:10px;padding-right:10px;">
          {/* Creates the heatmap. */}
          <CalendarHeatmap values={data} endDate={new Date()} classForValue={(value) => {
            // Checks if the value is valid if not gives a blank color.
            if (!value) { return 'color-empty'; }
            // Gets the color from the theme.
            return theme.getColorHeatMap(this.props.datapoint,value.count);
          }}/>
        </div>
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
        <Card.Actions>
            <button><small style="font-weight: lighter;">More</small></button>
        </Card.Actions>
      </Card>
      </div>
		);
	}
}
