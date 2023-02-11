export const ADD_SUBSCRIPTION = (item) => {
	return {
		type: "ADD_SUBSCRIPTION",
		payload: item
	}
}

export const REMOVE_SUBSCRIPTION = (item) => {
	return {
		type: "REMOVE_SUBSCRIPTION",
		payload: item
	}
}