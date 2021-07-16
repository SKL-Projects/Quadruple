import React, { useEffect, useState } from "react";
import Login from "../view/Login";
import { fbAuth, fbAuthObject, fbStore } from "../../../../firebase";
import { useDispatch } from "react-redux";
import { signin } from "../../../modules/auth";
import { View } from "react-native";
import PwResetModal from "../view/PwResetModal";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { googleSignIn } from "../../../../env";
import { getProfileAction } from "../../../modules/profile";

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
   const [loadingPwReset, setLoadingPwReset] = useState(false);
   const [PwResetSended, setPwResetSended] = useState(false);
   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      expoClientId: googleSignIn.expoGoClientId,
      androidClientId: googleSignIn.androidClientId,
      iosClientId: googleSignIn.iosClientId,
      webClientId: googleSignIn.webClientId,
      clientId: googleSignIn.clientId,
   });
   const dispatch = useDispatch();

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

   const handleError = (code) => {
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
   };

   const onPressLogin = async () => {
      if (!userInfo.email) {
         handleError("blank_email");
         return;
      } else if (!userInfo.password) {
         handleError("blank_password");
         return;
      }
      setLoading(true);
      if (login) {
         try {
            const res = await fbAuth.signInWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            dispatch(signin(res.user, "email"));
            navigation.navigate("Home");
         } catch (err) {
            handleError(err.code);
            console.log(err.code);
         }
      } else {
         if (userInfo.password !== userInfo.passwordCheck) {
            handleError("not_match_password_and_check");
            return;
         } else if (!userInfo.name) {
            handleError("blank_name");
            return;
         }
         try {
            let res = await fbAuth.createUserWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            await res.user.updateProfile({ displayName: userInfo.name });
            await fbStore.collection(res.user.uid).doc("profile").set({
               createdAt: Date.now(),
               name: userInfo.name,
            });
            res = await fbAuth.signInWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            dispatch(signin(res.user, "email"));
            navigation.navigate("Home");
         } catch (err) {
            handleError(err.code);
            console.log(err.code);
         }
      }
      setLoading(false);
   };

   const passwordReset = () => {
      setModalVisible(true);
   };
   const sendPwResetEmail = async () => {
      setLoadingPwReset(true);
      try {
         await fbAuth.sendPasswordResetEmail(userInfo.email);
         setPwResetSended(true);
         setUserInfo((prev) => ({ ...prev, password: "" }));
      } catch (err) {
         console.log(err);
      }
      setLoadingPwReset(false);
   };

   useEffect(() => {
      const googleSignin = async (credential) => {
         const res = await fbAuth.signInWithCredential(credential);
         dispatch(signin(res.user, "google"));
      };
      if (response?.type === "success") {
         const { id_token } = response.params;

         const credential =
            fbAuthObject.GoogleAuthProvider.credential(id_token);
         googleSignin(credential);
      }
   }, [response]);

   const onGoogleSignin = async () => {
      try {
         await promptAsync();
         navigation.navigate("Home");
      } catch (err) {
         console.log(err);
      }
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
            sendPwResetEmail={sendPwResetEmail}
            loadingPwReset={loadingPwReset}
            PwResetSended={PwResetSended}
            setPwResetSended={setPwResetSended}
         />
      </View>
   );
}

export default LoginContainer;
