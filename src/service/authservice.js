import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import request from 'superagent';
import Configs from '../configs';

export default {
  getToken() { return localStorage.getItem('id_token') || ''; },
  setCachedToken(token) { localStorage.setItem('id_token', token); },
  clearCachedToken() { localStorage.removeItem('id_token'); },
  login(form) {
    var form_data = new FormData();
    for ( var key in form ) { form_data.append(key, form[key]); }
    var self = this;
    request.post('http://localhost:8080/account/login').send(form_data).end(function(err, res) {
      if (!err) {
        console.log(res.body.success);
        self.setCachedToken(res.body.success);
      } else {
        console.log('Error!');
      }
    });
  },
  register(form) {
    var form_data = new FormData();
		for ( var key in form ) { form_data.append(key, form[key]); }
    request.put('http://localhost:8080/account/register').send(form_data).end(function(err, res) {
      if (!err) {
        console.log(res.body);
      } else {
        console.log('Error!');
      }
    });
  },
  getData() {
    
  }
}
