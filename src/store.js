import { createStore } from 'redux';

const colors = ['#0277bd','#03a9f4','#81d4fa','#ffcc80','#ff9800','#ef6c00'];
//Object {timestamp: 1498493428241753300, tags: Object, measurement: "ieq.energy", fields: Object}
var count = 0;

function updateTT(current,id,ts, node) {
	var newcurrent = current;
	for (var i = 0, j = ts.length; i < j; i++) {
		var currenttype = ts[i];
		var temp = { graphID:id, nodeID:node };

		if (newcurrent[currenttype] === undefined) {
			newcurrent[currenttype] = Array(temp);
		} else {
			newcurrent[currenttype].push(temp);
		}
	}
	return newcurrent;
}
//{ values: [], key: 'Current Temp.', color: '#ef6c00' }
function createDefautGraph(ts) {
	var arr = [];
	for (var i = 0, j = ts.length; i < j; i++) {
		arr.push({values: [], key:ts[i], color:colors[i]});
	}
	return arr;
}

function processData(graph,typetracker,item) {
	var tempgraph = JSON.parse(JSON.stringify(graph));
	if (typetracker[item.measurement] !== undefined) {
		var data = typetracker[item.measurement];
		for (var i = 0, j = data.length; i < j; i++) {
			var g = data[i].graphID;
			var d3g = tempgraph[g].datum;
			for (var x = 0, y = d3g.length; x < y; x++) {
				if (d3g[x].key === item.measurement) {
					var seconds = item.timestamp / 1000000000000;
					var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
					d.setUTCSeconds(item.timestamp );
					d3g[x].values.push({ x:item.timestamp,y:item.fields.value });
				}
			}
		}
	}

	return tempgraph;
}
//processData(graphs,typetracker,item)
let ACTIONS = {
	ADD_DATA: ({graphs,typetracker, ...state }, { item }) => ({
		graphs: processData(graphs,typetracker,item),
		typetracker: typetracker,
		...state
	}),

	ADD_GRAPH: ({ graphs,typetracker, ...state },{ id,ts,nodeID }) => ({
		graphs: {...graphs,
			[id]: {
				datum: createDefautGraph(ts)
			}
		},
		typetracker:updateTT(typetracker,id,ts,nodeID),
		...state
	})

/*	REMOVE_TODO: ({ todos, ...state }, { todo }) => ({
		todos: todos.filter( i => i!==todo ),
		...state
	})*/
};

const INITIAL = {
	/*todos: [],*/
	graphs: {},
	typetracker: {}
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
