//액션 타입
const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";

//액션 생성 함수
export const signin = (user, type) => ({
   type: SIGNIN,
   payload: { user: user, type: type },
});
export const signout = () => ({ type: SIGNOUT });

const initialState = {
   signined: false,
};

export default function auth(state = initialState, action) {
   switch (action.type) {
      case SIGNIN:
         return {
            signined: true,
            ...action.payload,
         };
      case SIGNOUT:
         return { signined: false };
      default:
         return state;
   }
}
