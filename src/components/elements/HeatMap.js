import { h, Component } from 'preact';
import CalendarHeatmap from 'react-calendar-heatmap';

import dataservice from '../../service/dataservice';
import theme from '../../theme';

export default class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }
  componentWillReceiveProps(nextProps) {
    dataservice.getData(nextProps.datapoint,nextProps.startDateTime,nextProps.endDateTime,'1d').then(payload => {
      var series = payload['results'][0].series;
      if (series !== undefined) {
        var results = series[0].values;
        var dx = [];
        for (var i = 0; i < results.length; i++) {
           var currentobj = results[i];
           dx.push({date:currentobj[0],count:currentobj[1]});
        }
        this.setState({data:dx});
      }
    });
  }
	render() {
    const { data } = this.state;
		return (
			<div>
      <div style="padding-left:10px;padding-right:10px;">
      <CalendarHeatmap
        values={data}
        endDate={new Date()}
        classForValue={(value) => {
          if (!value) { return 'color-empty'; }
          var currentval = value.count;
          return theme.getColorHeatMap(this.props.datapoint,currentval);;
        }}
      />
      </div>
      </div>
		);
	}
}
