var broadcasted = {};
var broadcastContains = {};

var ReactBroadcast = {
	broadcast: function(name, value){
		if (!broadcasted.hasOwnProperty(name)) broadcasted[name] = {value: value, callbacks: []};
		broadcasted[name].value = value;
		var i;
		for (i = 0; i < broadcasted[name].callbacks.length; i++){
			broadcasted[name].callbacks[i](broadcasted[name].value);
		}
		var keys = Object.keys(broadcastContains);
		for (i = 0; i < keys.length; i++){
			if (name.indexOf(keys[i]) > -1) {
				for (var j = 0; j < broadcastContains[keys[i]].callbacks.length; j++){
					broadcastContains[keys[i]].callbacks[j](value, name);
				}
			}
		}
	},
	on: function(name, callback){
		if (!broadcasted.hasOwnProperty(name)) broadcasted[name] = {value: '', callbacks: [callback]};
		else broadcasted[name].callbacks.push(callback);
	},
  remove: function(id) {
    broadcasted[id].callbacks = [];
  },
	onContains: function(name, callback){
		if (!broadcastContains.hasOwnProperty(name)) broadcastContains[name] = {callbacks: []};
		broadcastContains[name].callbacks.push(callback);
	},
	getAllNames: function(){
		return Object.keys(broadcasted);
	}
}

module.exports = ReactBroadcast;
