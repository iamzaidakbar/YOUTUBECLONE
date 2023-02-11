const addToSubscriptions = (subs = [], action) => {
	switch (action.type) {
		case "ADD_SUBSCRIPTION" :
			console.log(action.payload)
			return subs.concat(action.payload);
		case "REMOVE_SUBSCRIPTION" :
			return subs = []
		default:
			return subs
	}
}

export default addToSubscriptions;