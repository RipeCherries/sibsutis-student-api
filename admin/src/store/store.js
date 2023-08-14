import {createStore, combineReducers} from "redux";
import fileReducer from "./fileReducer";
import startOfSemesterReducer from "./startOfSemesterReducer";
import lastUpdateReducer from "./lastUpdateReducer";

const rootReducer = combineReducers({
    file: fileReducer,
    startOfSemester: startOfSemesterReducer,
    lastUpdate: lastUpdateReducer
});

const store = createStore(rootReducer);

export default store;