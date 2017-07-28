import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export default {
  api_endpoint() {
    return "http://35.167.180.46:8080";
  },
  title(type) {
    if (type === 'weather_station.outdoor_temperature') {
      return 'Outdoor Temperature';
    } else if (type === 'weather_station.indoor_temperature') {
      return 'Indoor Temperature';
    } else if (type === 'weather_station.humidity') {
      return 'Humidity';
    } else if (type === 'ieq.co2') {
      return 'CO2 (PPM)';
    }
    return type;
  }
}
