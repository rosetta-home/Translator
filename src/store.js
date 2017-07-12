import { createStore } from 'redux';
/* Array of the hex colors for RH  */
const colors = ['#0277bd','#03a9f4','#81d4fa','#ffcc80','#ff9800','#ef6c00'];
/* How many minutes graphs will display at once */
const graph_minutes = 0.1;
/* Update type tracker so the incoming item from satori know what graphs to be send too. */
function updateTypeTracker(tracker,id,ts,node) {
	/* Creates a copy of the tracker */
	var newtracker = JSON.parse(JSON.stringify(tracker));
	/* Goes though item types from graph */
	for (var i = 0, j = ts.length; i < j; i++) {
		/* Gets current type */
		var currenttype = ts[i];
		/* Create new obejct with graphID and nodeID */
		var temp = { graphID:id, nodeID:node };
		/* Checks if the tracker is tracking graph with said item type and add temp object */
		if (newtracker[currenttype] === undefined) { newtracker[currenttype] = Array(temp); }
		else { newtracker[currenttype].push(temp); }
	}
	/* Returns new state of type tracker */
	return newtracker;
}
function keyName(key) {
	if (key === 'weather_station.outdoor_temperature') {
		return 'Outdoor Temp.';
	} else if (key === 'weather_station.indoor_temperature') {
		return 'Indoor Temp.';
	}
}
/* Creates the default datum for graph */
function createDefautGraph(ts) {
	var arr = [];
	/* Goes though each data type and create set with the configs for d3.js */
	for (var i = 0, j = ts.length; i < j; i++) {
		arr.push({values: [],type:ts[i], key:keyName(ts[i]), color:colors[i], lastItem: null});
	}
	/* Returns the default datum */
	return arr;
}
/* Processes the data that is coming in from the Satori websocket */
function processData(graph,typetracker,item) {
	/* Creates a copy of the graph */
	var newgraph = JSON.parse(JSON.stringify(graph));
	/* Checks if the item type exists in the type tracker, hence needing to be added to graphs */
	if (typetracker[item.measurement] !== undefined) {
		/* Gets the tracking data from the type tracking object */
		var data = typetracker[item.measurement];
		/* Goes through each object to check if the nodeID are the same and if so adds the item */
		for (var i = 0, j = data.length; i < j; i++) {
			/* Gets the nodeID */
			var node_id = data[i].nodeID;
			/* Compares the nodeID with the nodeID in the item from websocket */
			if (node_id === item['tags'].node_id) {
				/* If so gets the current graph datum */
				var current_datum = newgraph[data[i].graphID].datum;
				/* Goes through the datum set to find the set to add item to values */
				for (var x = 0, y = current_datum.length; x < y; x++) {
					/* Gets the current set */
					var cd = current_datum[x];
					/* Checks the set type and item measurement */
					if (cd.type === item.measurement) {
						/* Gets the timestamp and creates the lastItem */
						var ms = item.timestamp / 1000000;
						var lastItem = { x:ms,y:item.fields.value };
						/* Adds the lastItem to the data set and sets it as the lastItem in graph*/
						cd.values.push(lastItem);
						cd.lastItem = lastItem;
					}
				}
			}
		}
	}
	return newgraph;
}
function addpoint(graph,id) {
	/* Creates a copy of the graph object */
	var copygraph = JSON.parse(JSON.stringify(graph));
	/* Gets the current datum using the id */
	var graph_datum = copygraph[id].datum;
	/* Goes through the sets in the current datum */
	for (var x = 0, y = graph_datum.length; x < y; x++) {
		/* Gets the current set from the datum */
		var current_set = graph_datum[x];
		/* Will only add point from the timer if the lastItem is not null and values count is not 0 */
		if ((current_set.lastItem !== null) && (current_set.values !== 0)) {
			 /* Gets the lastItem */
			 var newlastItem = current_set.lastItem;
			 /* Adds a second to the timestamp */
			 newlastItem.x = newlastItem.x + 1000;
			 /* Sets the new lastItem and adds to dataset to update graph */
			 current_set.lastItem = newlastItem;
			 current_set.values.push(newlastItem);
			 /* Checks if the data set values in the current datum is more than the graph_minutes count */
			 if (current_set.values.length > (graph_minutes * 60)) {
				 /* If so it splice the array to give a nice transition */
				 var diff = current_set.values.length - (graph_minutes * 60);
				 current_set.values.splice(0,diff);
			 }
		}
	}
	/* Returns the new graph state */
	return copygraph;
}

let ACTIONS = {
	ADD_DATA: ({graphs,typetracker, ...state }, { item }) => ({
		graphs: processData(graphs,typetracker,item),
		typetracker: typetracker,
		...state
	}),
	ADD_POINT: ({graphs, ...state }, { id }) => ({
		graphs: addpoint(graphs,id),
		...state
	}),
	ADD_GRAPH: ({ graphs,typetracker, ...state },{ id,ts,nodeID }) => ({
		graphs: {...graphs,
			[id]: {
				datum: createDefautGraph(ts)
			}
		},
		typetracker:updateTypeTracker(typetracker,id,ts,nodeID),
		...state
	})
};

const INITIAL = {
	graphs: {},
	typetracker: {},
	isLoggedIn: false
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
