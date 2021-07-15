import { call, put, takeLatest } from "redux-saga/effects";
import { getProfile } from "../lib/api/profile";
//액션 타입
const GET_PROFILE = "GET_PROFILE";
const GET_PROFILE_ASYNC = "GET_PROFILE_ASYNC";
const CLEAR_PROFILE = "CLEAR_PROFILE";
const SET_PROFILE = "SET_PROFILE";

//액션 생성 함수
export const getProfileAction = (uid) => ({ type: GET_PROFILE, payload: uid });
export const setProfileAction = (payload) => ({
   type: SET_PROFILE,
   payload: payload,
});
export const clearProfile = () => ({ type: CLEAR_PROFILE });

function* getProfileAsync(action) {
   try {
      const res = yield call(getProfile, action.payload);
      yield put({ type: GET_PROFILE_ASYNC, payload: res });
   } catch (err) {
      console.log(err);
   }
}

export function* profileSaga() {
   yield takeLatest(GET_PROFILE, getProfileAsync);
}

const initialState = {};

export default function profile(state = initialState, action) {
   switch (action.type) {
      case GET_PROFILE_ASYNC:
         return { ...action.payload };
      case CLEAR_PROFILE:
         return {};
      case SET_PROFILE:
         return { ...state, ...action.payload };
      default:
         return state;
   }
}
