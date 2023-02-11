import {combineReducers} from "redux"
import addToWatchHistory from "./watch-history-manager";
import addToSubscriptions from "./subscription-manager";

const rootReducer = combineReducers({
	addToWatchHistory,
	addToSubscriptions
})

export default rootReducer;