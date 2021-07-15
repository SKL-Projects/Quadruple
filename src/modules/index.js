import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import profile, { profileSaga } from "./profile";

// 일반 redux 연결
const rootReducer = combineReducers({ auth, profile });

// react saga 연결
export function* rootSaga() {
   yield all([profileSaga()]);
}

export default rootReducer;
