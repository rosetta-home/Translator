var broadcasted = {};
var broadcastContains = {};
// Event broadcast emitter
var ReactBroadcast = {
	broadcast: function(name, value){
    //broadcast vales or object to all components with channel name
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
    // Sets the channel for receiving the data
		if (!broadcasted.hasOwnProperty(name)) broadcasted[name] = {value: '', callbacks: [callback]};
		else broadcasted[name].callbacks.push(callback);
	},
  remove: function(id) {
    // Removes the callbacks for the channel name
    broadcasted[id].callbacks = [];
  },
	onContains: function(name, callback){
		if (!broadcastContains.hasOwnProperty(name)) broadcastContains[name] = {callbacks: []};
		broadcastContains[name].callbacks.push(callback);
	}
}

module.exports = ReactBroadcast;
