const addToWatchHistory = (state = [], action) => {
	switch (action.type) {
		case "ADD" :
			return state.concat(action.payload);
		case "CLEAR" :
			return state = []
		default:
			return state
	}
}

export default addToWatchHistory;