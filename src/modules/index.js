import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import planMap from "./plansMap";
import { dataSaga } from "./data";

// 일반 redux 연결
const rootReducer = combineReducers({ auth, planMap });

// react saga 연결
export function* rootSaga() {
   yield all([dataSaga]);
}

export default rootReducer;
