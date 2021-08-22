import React, { useEffect, useState } from "react";
import Login from "../view/Login";
import { fbAuth, fbAuthObject } from "../../../../firebase";
import { View } from "react-native";
import PwResetModal from "../view/PwResetModal";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import handleError, {
   catchError,
   checkPassword,
} from "../../utils/HandleAuthErr";
import VerifyEmailModal from "../view/VerifyEmailModal";
import { config } from "../../utils/GoogleAuthConfig";
import { Overlay } from "react-native-elements";
import LottieView from "lottie-react-native";

WebBrowser.maybeCompleteAuthSession();

function LoginContainer({ navigation }) {
   const [login, setLogIn] = useState(true);
   const [userInfo, setUserInfo] = useState({
      password: "",
      passwordCheck: "",
      email: "",
      name: "",
   });
   const [errMsg, setErrMsg] = useState({
      email: "",
      name: "",
      password: "",
      passwordCheck: "",
   });
   const [wrongPW, setWrongPW] = useState(false);
   const [loading, setLoading] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [PwResetSended, setPwResetSended] = useState(false);
   const [request, response, promptAsync] =
      Google.useIdTokenAuthRequest(config);
   const [visibleSentEmail, setVisibleSentEmail] = useState(false);

   // 구글 로그인 리스너 등록
   useEffect(() => {
      const googleSignin = async (credential) => {
         const res = await fbAuth.signInWithCredential(credential);
         await fbAuth.setPersistence(fbAuthObject.Auth.Persistence.LOCAL);
      };
      if (response?.type === "success") {
         const { id_token } = response.params;

         const credential =
            fbAuthObject.GoogleAuthProvider.credential(id_token);
         googleSignin(credential);
      }
   }, [response]);

   const onChange = (name, value) => {
      if (errMsg[name]) {
         setErrMsg((prev) => ({ ...prev, [name]: "" }));
      }
      if (value && name !== "name" && !/[0-9a-zA-Z.;\-]/.test(value)) {
         setErrMsg((prev) => ({
            ...prev,
            [name]: "영어, 숫자, 특수문자만 가능합니다.",
         }));
         return;
      }
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (!userInfo.email) {
         handleError("blank_email", setErrMsg);
         return;
      } else if (!checkPassword(userInfo.password, setErrMsg)) {
         return;
      }
      // 로그인일경우 if문이, 회원가입일 경우 else문이 실행됨.
      if (login) {
         setLoading(true);
         try {
            await fbAuth.signInWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            await fbAuth.setPersistence(fbAuthObject.Auth.Persistence.LOCAL);
            navigation.navigate("Home");
         } catch (err) {
            catchError(err.code, setErrMsg, "password");
            if (err.code === "auth/wrong-password") {
               setWrongPW(true);
            }
         }
      } else {
         if (userInfo.password !== userInfo.passwordCheck) {
            handleError("not_match_password_and_check", setErrMsg);
            return;
         } else if (!userInfo.name) {
            handleError("blank_name", setErrMsg);
            return;
         }
         setLoading(true);

         //가입
         let res;
         try {
            res = await fbAuth.createUserWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
         } catch (err) {
            catchError(err.code, setErrMsg, "passwordCheck");
            setLoading(false);
            return;
         }

         // 사용자 이름 업데이트
         await res.user.updateProfile({ displayName: userInfo.name });

         // 로그인
         res = await fbAuth.signInWithEmailAndPassword(
            userInfo.email,
            userInfo.password
         );

         // 인증 메일 보내기
         try {
            await res.user.sendEmailVerification();
            setVisibleSentEmail(true);
         } catch (err) {
            catchError(err.code, setErrMsg, "passwordCheck");
         }
      }
      setLoading(false);
   };

   //비번 찾기 버튼 눌렀을때
   const passwordReset = () => {
      setModalVisible(true);
   };

   //구글로 로그인하기 버튼 눌렀을때.
   const onGoogleSignin = async () => {
      try {
         await promptAsync();
         navigation.navigate("Home");
      } catch (err) {
         console.log(err);
      }
   };

   // 이메일 다 보내고, 닫기
   const onCloseSentEmail = () => {
      setVisibleSentEmail(false);
      navigation.navigate("Home");
   };

   // 가입 후 이메일 인증을 위한 메일보내기.
   // 인증 안해도 로그인은 됨.
   const sendPwResetEmail = async () => {
      setLoading(true);
      try {
         await fbAuth.sendPasswordResetEmail(userInfo.email);
         setPwResetSended(true);
         setUserInfo((prev) => ({ ...prev, password: "" }));
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };

   return (
      <View style={{ flex: 1 }}>
         <Login
            navigation={navigation}
            userInfo={userInfo}
            onChange={onChange}
            login={login}
            setLogIn={setLogIn}
            onPressLogin={onPressLogin}
            errMsg={errMsg}
            loading={loading}
            wrongPW={wrongPW}
            passwordReset={passwordReset}
            onGoogleSignin={onGoogleSignin}
         />
         <PwResetModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            email={userInfo.email}
            PwResetSended={PwResetSended}
            sendPwResetEmail={sendPwResetEmail}
         />
         <VerifyEmailModal
            visible={visibleSentEmail}
            onCloseSentEmail={onCloseSentEmail}
         />

         <Overlay
            isVisible={loading}
            overlayStyle={{
               padding: 0,
               elevation: 0,
               backgroundColor: "transparent",
            }}>
            <LottieView
               style={{
                  width: 100,
                  height: 100,
               }}
               autoPlay
               source={require("../../../lib/styles/lottie/loading-circle.json")}
            />
         </Overlay>
      </View>
   );
}

export default LoginContainer;
