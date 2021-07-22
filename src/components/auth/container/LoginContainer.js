import React, { useEffect, useState } from "react";
import Login from "../view/Login";
import { fbAuth, fbAuthObject, fbStore } from "../../../../firebase";
import { useDispatch } from "react-redux";
import { signin } from "../../../modules/auth";
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
   const dispatch = useDispatch();
   const [visibleSentEmail, setVisibleSentEmail] = useState(false);

   useEffect(() => {
      const googleSignin = async (credential) => {
         const res = await fbAuth.signInWithCredential(credential);
         await fbAuth.setPersistence(fbAuthObject.Auth.Persistence.LOCAL);
         dispatch(signin(res.user));
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
      if (login) {
         setLoading(true);
         try {
            const res = await fbAuth.signInWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            dispatch(signin(res.user));
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
            return;
         }

         // 사용자 이름 업데이트
         await res.user.updateProfile({ displayName: userInfo.name });
         /*
         await fbStore.collection(res.user.uid).doc("profile").set({
            createdAt: Date.now(),
            name: userInfo.name,
         });*/

         // 로그인
         res = await fbAuth.signInWithEmailAndPassword(
            userInfo.email,
            userInfo.password
         );
         dispatch(signin(res.user, "email"));

         // 인증 메일 보내기
         try {
            await res.user.sendEmailVerification();
            setVisibleSentEmail(true);
         } catch (err) {
            try {
               await res.user.sendEmailVerification();
               setVisibleSentEmail(true);
            } catch (err) {
               catchError(err.code, setErrMsg, "passwordCheck");
               return;
            }
         }
      }
      setLoading(false);
   };
   const passwordReset = () => {
      setModalVisible(true);
   };

   const onGoogleSignin = async () => {
      try {
         await promptAsync();
         navigation.navigate("Home");
      } catch (err) {
         console.log(err);
      }
   };

   const onCloseSentEmail = () => {
      setVisibleSentEmail(false);
      navigation.navigate("Home");
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
            setPwResetSended={setPwResetSended}
         />
         <VerifyEmailModal
            visible={visibleSentEmail}
            onCloseSentEmail={onCloseSentEmail}
         />
      </View>
   );
}

export default LoginContainer;
