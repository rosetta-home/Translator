import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export default {
  getColor(datapoint,currentval) {
    var color = '#0277bd';
    if (datapoint === "ieq.co2") {
      if (0 < currentval && currentval < 600) { color = '#0277bd'; }
      if (600 < currentval && currentval < 800) { color = '#03a9f4'; }
      if (800 < currentval && currentval < 1000) { color = '#81d4fa'; }
      if (1000 < currentval && currentval < 1200) { color = '#ffcc80'; }
      if (1200 < currentval && currentval < 1400) { color = '#ff9800'; }
      if (currentval > 1400) { color = '#ef6c00'; }
    }
    return color;
  },
  getColorHeatMap(datapoint,currentval) {
    var color = 'color-empty';
    if (datapoint === "ieq.co2") {
      if (0 < currentval && currentval < 600) {
        color = 'color-600';
      }
      if (600 < currentval && currentval < 800) {
        color = 'color-800';
      }
      if (800 < currentval && currentval < 1000) {
        color = 'color-1000';
      }
      if (1000 < currentval && currentval < 1200) {
        color = 'color-1200';
      }
      if (1200 < currentval && currentval < 1400) {
        color = 'color-1400';
      }
      if (currentval > 1400) {
        color = 'color-1400';
      }
    }
    return color;
  }
}
