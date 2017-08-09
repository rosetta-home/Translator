import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export default {
  api_endpoint() {
    return "http://35.167.180.46:8080";
  },
  title(type) {
    if (type === 'weather_station.outdoor_temperature') {
      return 'Outdoor Temp.';
    } else if (type === 'weather_station.indoor_temperature') {
      return 'Indoor Temp.';
    } else if (type === 'weather_station.humidity') {
      return 'Humidity';
    } else if (type === 'ieq.co2') {
      return 'CO2 (PPM)';
    } else if (type === 'smart_meter.kw') {
      return 'Smart Meter Kilowatt';
    } else if (type === 'smart_meter.price') {
      return 'Kilowatt Price';
    } else if (type === 'weather_station.pressure') {
      return 'Pressure';
    } else if (type === 'weather_station.uv') {
      return 'UV';
    }
    return type;
  }
}
