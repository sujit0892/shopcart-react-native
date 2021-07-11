import { combineReducers, createStore } from "redux";
import reducer from "./reducers/reducers";


// const rootReducer = combineReducers({
//     reducer:reducer
// })

const configureStore = ()=> createStore(reducer);

export default configureStore;