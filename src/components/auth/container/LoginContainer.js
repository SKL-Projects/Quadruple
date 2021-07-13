import React, { useState } from "react";
import Login from "../view/Login";
import { fbAuth, fbStore } from "../../../../firebase";
import { useDispatch } from "react-redux";
import { signin } from "../../../modules/auth";
import { View } from "react-native";
import PwResetModal from "../view/PwResetModal";

function LoginContainer({ navigation }) {
   const [login, setLogIn] = useState(true);
   const [userInfo, setUserInfo] = useState({
      password: "",
      passwordCheck: "",
      email: "",
   });
   const [errMsg, setErrMsg] = useState({
      email: "",
      password: "",
      passwordCheck: "",
   });
   const [wrongPW, setWrongPW] = useState(false);
   const [loading, setLoading] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [loadingPwReset, setLoadingPwReset] = useState(false);
   const [PwResetSended, setPwResetSended] = useState(false);
   const dispatch = useDispatch();

   const onChange = (name, value) => {
      if (name === "email" && errMsg.email) {
         setErrMsg((prev) => ({ ...prev, email: "" }));
      } else if (name === "password" && errMsg.password) {
         setErrMsg((prev) => ({ ...prev, password: "" }));
      } else if (name === "passwordCheck" && errMsg.passwordCheck) {
         setErrMsg((prev) => ({ ...prev, passwordCheck: "" }));
      }
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (!userInfo.email) {
         setErrMsg((prev) => ({
            ...prev,
            email: "이메일을 입력해주세요.",
         }));
         return;
      } else if (!userInfo.password) {
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호를 입력해주세요.",
         }));
         return;
      }
      setLoading(true);
      if (login) {
         try {
            const res = await fbAuth.signInWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            dispatch(signin(res.user.email, res.user.uid));
            navigation.navigate("Home");
         } catch (err) {
            if (err.code === "auth/wrong-password") {
               setErrMsg((prev) => ({
                  ...prev,
                  password: "비밀번호가 틀렸습니다.",
               }));
               setWrongPW(true);
            } else if (err.code === "auth/user-not-found") {
               setErrMsg((prev) => ({
                  ...prev,
                  email: "존재하지 않는 회원입니다..",
               }));
            } else if (err.code === "auth/invalid-email") {
               setErrMsg((prev) => ({
                  ...prev,
                  email: "이메일 형식을 지켜주세요.",
               }));
            }
            console.log(err.code);
         }
      } else {
         if (userInfo.password !== userInfo.passwordCheck) {
            setErrMsg((prev) => ({
               ...prev,
               passwordCheck: "비밀번호가 일치하지 않습니다.",
            }));
            return;
         }
         try {
            let res = await fbAuth.createUserWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            await fbStore.collection(res.user.uid).doc("user").set({
               createdAt: Date.now(),
            });
            res = await fbAuth.signInWithEmailAndPassword(
               userInfo.email,
               userInfo.password
            );
            dispatch(signin(res.user.email, res.user.uid));
            navigation.navigate("Home");
         } catch (err) {
            if (err.code === "auth/invalid-email") {
               setErrMsg((prev) => ({
                  ...prev,
                  email: "이메일 형식을 지켜주세요.",
               }));
            } else if (err.code === "auth/email-already-in-use") {
               setErrMsg((prev) => ({
                  ...prev,
                  email: "이미 사용중인 이메일입니다.",
               }));
            }
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
