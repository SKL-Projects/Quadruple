//액션 타입
const SET_PLAN_MAP = "SET_PLAN_MAP";
const CLEAR_MAP = "CLEAR_MAP";
//액션 생성 함수
export const setPlanMap = (map) => ({
   type: SET_PLAN_MAP,
   payload: map,
});
export const clearMap = () => ({ type: CLEAR_MAP });

const initialState = {};

export default function planMap(state = initialState, action) {
   switch (action.type) {
      case SET_PLAN_MAP:
         return action.payload;
      case CLEAR_MAP:
         return {};
      default:
         return state;
   }
}
