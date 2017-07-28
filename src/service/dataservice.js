import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import request from 'superagent';
import Configs from '../configs';
import DRes from './dres';
import { route } from 'preact-router';
import authentication from './authservice';

export default {
  async getData(datapoint,start,end,res) {
    return new Promise((resolve, reject) => {
      var temp_res = res;
      if ((start === null) || (end === null)) { return null; }
      if ((temp_res === undefined) || (temp_res === null)) { temp_res = DRes.getResolution(start,end); }
      request.get(Configs.api_endpoint() + '/data/mean/'+ datapoint +'/'+ start +'/' + end + '/' + temp_res)
      .set({'Content-Type':'application/json','Authorization':'Bearer ' + authentication.getToken()})
      .send({}).end(function(err, res) {
        err ? reject(err) : resolve(JSON.parse(res.text));
      });
    });
  },
  urlMaker(array,start,end,res) {
    var uriset = [];
    var temp_res = res;
    if ((start === null) || (end === null)) { return []; }
    if ((temp_res === undefined) || (temp_res === null)) { temp_res = DRes.getResolution(start,end); }
    for (var i = 0; i < array.length; i++) {
      uriset.push(Configs.api_endpoint() + '/data/mean/' + array[i] +'/'+ start +'/' + end + '/' + temp_res);
    }
    return uriset;
  }
}
