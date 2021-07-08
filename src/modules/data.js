import { put, takeLatest } from "redux-saga/effects";

const [GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE] = [
   "data/GET_DATA",
   "data/GET_DATA_SUCCESS",
   "data/GET_DATA_FAILURE",
];

export const getData = (id) => ({ type: GET_DATA, payload: id });

function* getDataSaga(id) {
   put({ type: GET_DATA_SUCCESS, payload: id });
}

export function* dataSaga() {
   yield takeLatest(GET_DATA, getDataSaga);
}

const initailState = { id: 0 };

export default function dataReduxExample(state = initailState, action) {
   switch (action.type) {
      case GET_DATA:
         return { id: action.payload };
      default:
         return state;
   }
}
