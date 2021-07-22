import testPassword from "./testPassword";

export default function handleError(code, setErrMsg) {
   switch (code) {
      case "blank_email":
         setErrMsg((prev) => ({
            ...prev,
            email: "이메일을 입력해주세요.",
         }));
         return true;
      case "blank_password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호를 입력해주세요.",
         }));
         return true;
      case "auth/wrong-password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호가 틀렸습니다.",
         }));
         return true;
      case "auth/user-not-found":
         setErrMsg((prev) => ({
            ...prev,
            email: "존재하지 않는 회원입니다..",
         }));
         return true;
      case "auth/invalid-email":
         setErrMsg((prev) => ({
            ...prev,
            email: "이메일 형식을 지켜주세요.",
         }));
         return true;
      case "auth/email-already-in-use":
         setErrMsg((prev) => ({
            ...prev,
            email: "이미 사용중인 이메일입니다.",
         }));
         return true;
      case "not_match_password_and_check":
         setErrMsg((prev) => ({
            ...prev,
            passwordCheck: "비밀번호가 일치하지 않습니다.",
         }));
         return true;
      case "blank_name":
         setErrMsg((prev) => ({
            ...prev,
            name: "닉네임을 입력해주세요.",
         }));
         return true;
      case "auth/weak-password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호가 너무 간단합니다.",
         }));
         return true;
      case "password_not_formmatted":
         setErrMsg((prev) => ({
            ...prev,
            password:
               "비밀번호는 영문자, 숫자, 특수문자 조합으로 8~50자여야합니다.",
         }));
         return true;
      default:
         return false;
   }
}

export const checkPassword = (pw, setErrMsg) => {
   if (!pw) {
      handleError("blank_password", setErrMsg);
      return false;
   } else if (!testPassword(pw)) {
      handleError("password_not_formmatted", setErrMsg);
      return false;
   }
   return true;
};

export const catchError = (code, setErrMsg, lastSection) => {
   if (!handleError(code, setErrMsg)) {
      setErrMsg((prev) => ({
         ...prev,
         [lastSection]: "알수없는 오류가 발생했습니다. 다시 시도해주세요.",
      }));
   }
};
