
export function addData(item) {
	return {
		type: 'ADD_DATA',
		item
	};
}

export function removeTodo(todo) {
	/*return {
		type: 'REMOVE_TODO',
		todo
	};*/
}

export function createGraph(id,ts,nodeID) {
	return {
		type: 'ADD_GRAPH',
		id,ts,nodeID
	};
}
