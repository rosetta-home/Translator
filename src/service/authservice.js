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
  login(form) {
    return new Promise((resolve, reject) => {
    var form_data = new FormData();
    for ( var key in form ) { form_data.append(key, form[key]); }
      request.post('http://35.167.180.46:8080/account/login').send(form_data).end(function(err, res) {
        err ? reject(err) : resolve(res);
      });
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
  promisebuild(uri) {
    return new Promise((resolve, reject) => {
      request.get(uri).set({'Content-Type':'application/json','Authorization':'Bearer ' + this.getToken()})
      .send({}).end(function(err, res) { err ? reject(err) : resolve(JSON.parse(res.text)); });
    });
  },
  multipromise(uris) {
    return new Promise((resolve, reject) => {
      var promises = [];
      var self = this;
      uris.forEach(function(element) {
        promises.push(self.promisebuild(element));
      });
      Promise.all(promises).then((values) => {
        resolve(values);
      }, function() {
        reject("Failed")
      });
    });
  },
  async getData(datapoint) {
    return new Promise((resolve, reject) => {
      request.get('http://35.167.180.46:8080/data/mean/'+ datapoint +'/2017-07-01T12:12:12Z/2017-07-07T12:12:12Z/1d')
      .set({'Content-Type':'application/json','Authorization':'Bearer ' + this.getToken()})
      .send({})
      .end(function(err, res) {
        err ? reject(err) : resolve(JSON.parse(res.text));
      });
    });
  },
  async getData2(datapoint) {
    return new Promise((resolve, reject) => {
      request.get('http://35.167.180.46:8080/data/mean/'+ datapoint +'/2017-07-01T12:12:12Z/2017-07-07T12:12:12Z/60m')
      .set({'Content-Type':'application/json','Authorization':'Bearer ' + this.getToken()})
      .send({})
      .end(function(err, res) {
        err ? reject(err) : resolve(JSON.parse(res.text));
      });
    });
  }
}
