//액션 타입
const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";

//액션 생성 함수
export const signin = (email, uid) => ({
   type: SIGNIN,
   payload: { email: email, uid: uid },
});
export const signout = () => ({ type: SIGNOUT });

const initialState = { signined: false, email: "", uid: "" };

export default function auth(state = initialState, action) {
   switch (action.type) {
      case SIGNIN:
         return {
            signined: true,
            email: action.payload.email,
            uid: action.payload.uid,
         };
      case SIGNOUT:
         return { signined: false, email: "", uid: "" };
      default:
         return state;
   }
}
