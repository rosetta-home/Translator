import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const minutetag = 'm';
const weektag = 'w';

export default {
  minutes(mins) { return mins + minutetag; },
  weeks(wee) { return wee + weektag; }
}
