export function addData(item) {
	return {
		type: 'ADD_DATA',
		item
	};
}

export function createGraph(id,ts,nodeID) {
	return {
		type: 'ADD_GRAPH',
		id,ts,nodeID
	};
}

export function graphAddPoint(id) {
	return {
		type: 'ADD_POINT',
		id
	};
}
