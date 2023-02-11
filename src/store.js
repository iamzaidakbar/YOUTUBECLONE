import {createStore} from "redux";
import rootReducer from "./reducers/combine";

const store = createStore(rootReducer)

export default store