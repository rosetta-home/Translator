import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export default {
  title(type) {
    if (type === 'weather_station.outdoor_temperature') {
      return 'Outdoor Temperature';
    } else if (type === 'weather_station.indoor_temperature') {
      return 'Indoor Temperature';
    } else if (type === 'weather_station.humidity') {
      return 'Humidity';
    } else if (type === 'ieq.co2') {
      return 'CO2 (Parts Per Million)';
    }
    return type;
  }
}
