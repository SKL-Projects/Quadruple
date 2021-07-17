export default function handleError(code, setErrMsg) {
   switch (code) {
      case "blank_email":
         setErrMsg((prev) => ({
            ...prev,
            email: "이메일을 입력해주세요.",
         }));
         break;
      case "blank_password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호를 입력해주세요.",
         }));
      case "auth/wrong-password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호가 틀렸습니다.",
         }));
         setWrongPW(true);
         break;
      case "auth/user-not-found":
         setErrMsg((prev) => ({
            ...prev,
            email: "존재하지 않는 회원입니다..",
         }));
         break;
      case "auth/invalid-email":
         setErrMsg((prev) => ({
            ...prev,
            email: "이메일 형식을 지켜주세요.",
         }));
         break;
      case "auth/email-already-in-use":
         setErrMsg((prev) => ({
            ...prev,
            email: "이미 사용중인 이메일입니다.",
         }));
         break;
      case "not_match_password_and_check":
         setErrMsg((prev) => ({
            ...prev,
            passwordCheck: "비밀번호가 일치하지 않습니다.",
         }));
         break;
      case "blank_name":
         setErrMsg((prev) => ({
            ...prev,
            name: "닉네임을 입력해주세요.",
         }));
         break;
      case "auth/weak-password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호가 너무 간단합니다.",
         }));
         break;
   }
}