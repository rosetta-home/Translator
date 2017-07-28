import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import moment from 'moment';

const minutetag = 'm';
const weektag = 'w';
const hourtag = 'h';

export default {
  minutes(mins) { return mins + minutetag; },
  weeks(wee) { return wee + weektag; },
  hours(hour) { return hour + hourtag; },
  getResolution(start,end) {
    var duration = moment.duration(moment(end).diff(start));
    var hours = duration.asHours();
    var days = Math.round(hours / 24);

    if (days < 14) {
      return this.minutes(30);;

    }
    return this.hours(6);
  }
}
