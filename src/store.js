import { createStore } from 'redux';
/* Array of the hex colors for RH  */
const colors = ['#0277bd','#03a9f4','#81d4fa','#ffcc80','#ff9800','#ef6c00'];
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
/* Creates the default datum for graph */
function createDefautGraph(ts) {
	var arr = [];
	/* Goes though each data type and create set with the configs for d3.js */
	for (var i = 0, j = ts.length; i < j; i++) {
		arr.push({values: [],type:ts[i], key:ts[i], color:colors[i], lastItem: null});
	}
	/* Returns the default datum */
	return arr;
}
/* Processes the data that is coming in from the Satori websocket */
function processData(graph,typetracker,item) {
	var newgraph = JSON.parse(JSON.stringify(graph));
	if (typetracker[item.measurement] !== undefined) {
		var data = typetracker[item.measurement];
		for (var i = 0, j = data.length; i < j; i++) {
			var node_id = data[i].nodeID;
			if (node_id === item['tags'].node_id) {
				var current_datum = newgraph[data[i].graphID].datum;
				for (var x = 0, y = current_datum.length; x < y; x++) {
					var cd = current_datum[x];
					if (cd.key === item.measurement) {
						var ms = item.timestamp / 1000000;
						var lastItem = { x:ms,y:item.fields.value };
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
	var copygraph = JSON.parse(JSON.stringify(graph));
	var graph_datum = copygraph[id].datum;
	for (var x = 0, y = graph_datum.length; x < y; x++) {
		var current_set = graph_datum[x];
		if ((current_set.lastItem !== null) && (current_set.values !== 0)) {
			 var newlastItem = current_set.lastItem;
			 newlastItem.x = newlastItem.x + 1000;
			 current_set.lastItem = newlastItem;
			 current_set.values.push(newlastItem);
			 if (current_set.values.length > 20) {
				 var diff = current_set.values.length - 20;
				 current_set.values.splice(0,diff);
			 }
		}
	}
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
	typetracker: {}
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
