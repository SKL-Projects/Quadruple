import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import dataReduxExample, { dataSaga } from "./data";

// 일반 redux 연결
const rootReducer = combineReducers({ dataReduxExample });

// react saga 연결
export function* rootSaga() {
   yield all([dataSaga()]);
}

export default rootReducer;
