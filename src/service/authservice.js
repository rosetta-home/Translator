import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import request from 'superagent';
import Configs from '../configs';
import DRes from './dres';

export default {
  getToken() { return localStorage.getItem('id_token') || ''; },
  setCachedToken(token) { localStorage.setItem('id_token', token); },
  clearCachedToken() { localStorage.removeItem('id_token'); },
  login(form) {
    var form_data = new FormData();
    for ( var key in form ) { form_data.append(key, form[key]); }
    var self = this;
    request.post('http://35.167.180.46:8080/account/login').send(form_data).end(function(err, res) {
      if (!err) {
        console.log(res.body.success);
        self.setCachedToken(res.body.success);
        alert("You Good!");
      } else {
        console.log('Error!');
        alert(err);
      }
    });
  },
  register(form) {
    var form_data = new FormData();
		for ( var key in form ) { form_data.append(key, form[key]); }
    request.put('http://35.167.180.46:8080/account/register').send(form_data).end(function(err, res) {
      if (!err) {
        console.log(res.body);
      } else {
        console.log('Error!');
      }
    });
  },
  async getData(datapoint) {
    //ieq.co2

    console.log(DRes.minutes(60));
    return new Promise((resolve, reject) => {
      request.get('http://35.167.180.46:8080/data/mean/ieq.co2/2017-07-06T12:12:12Z/now/60m')
      .set({'Content-Type':'application/json','Authorization':'Bearer ' + this.getToken()})
      .send({})
      .end(function(err, res) {
        err ? reject(err) : resolve(JSON.parse(res.text));
      });
    });
  }
}
