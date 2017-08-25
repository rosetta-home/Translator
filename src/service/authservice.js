import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import request from 'superagent';
import Configs from '../configs';
import DRes from './dres';
import { route } from 'preact-router';

export default {
  getToken() { return localStorage.getItem('id_token') || ''; },
  setCachedToken(token) { localStorage.setItem('id_token', token); },
  clearCachedToken() { localStorage.removeItem('id_token'); },
  getAccount() { return localStorage.getItem('account') || null; },
  setCachedAccount(account) { localStorage.setItem('account', account); },
  clearCachedAccount() { localStorage.removeItem('account'); },
  login(form) {
    return new Promise((resolve, reject) => {
      var form_data = new FormData();
      for ( var key in form ) {
        form_data.append(key, form[key]);
      }
      request.post(Configs.api_endpoint() + '/account/login').send(form_data).end(function(err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  forgotpassword(email) {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve("email has been reset");
      }, 3000);
    });
  },
  register(form) {
    var form_data = new FormData();
		for ( var key in form ) { form_data.append(key, form[key]); }
    request.put(Configs.api_endpoint() + '/account/register').send(form_data).end(function(err, res) {
      if (!err) {
        console.log(res.body);
      } else {
        console.log('Error!');
      }
    });
  },
  async getData(datapoint) {
    return new Promise((resolve, reject) => {
      request.get(Configs.api_endpoint() + '/data/mean/'+ datapoint +'/2017-07-01T12:12:12Z/2017-07-07T12:12:12Z/12h')
      .set({'Content-Type':'application/json','Authorization':'Bearer ' + this.getToken()})
      .send({})
      .end(function(err, res) {

        err ? reject(err) : resolve(JSON.parse(res.text));
      });
    });
  },
  async getData2(datapoint,start,end) {
    return new Promise((resolve, reject) => {
      request.get(Configs.api_endpoint() + '/data/mean/'+ datapoint +'/'+ start +'/' + end + '/60m')
      .set({'Content-Type':'application/json','Authorization':'Bearer ' + this.getToken()})
      .send({})
      .end(function(err, res) {
        err ? reject(err) : resolve(JSON.parse(res.text));
      });
    });
  }
}
