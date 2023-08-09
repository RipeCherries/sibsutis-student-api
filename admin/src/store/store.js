import {createStore, combineReducers} from "redux";
import fileReducer from "./fileReducer";
import startOfSemesterReducer from "./startOfSemesterReducer";

const rootReducer = combineReducers({
    file: fileReducer,
    startOfSemester: startOfSemesterReducer
});

const store = createStore(rootReducer);

export default store;