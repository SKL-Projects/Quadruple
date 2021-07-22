import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { config } from "../../utils/GoogleAuthConfig";
import ReauthenticateModal from "../view/ReauthenticateModal";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import handleError, { checkPassword } from "../../utils/HandleAuthErr";
import { fbAuth, fbAuthObject } from "../../../../firebase";

WebBrowser.maybeCompleteAuthSession();

function ReauthenticateModalContainer({
   setReauthenticated,
   reauthVisible,
   setReauthVisible,
}) {
   const { user } = useSelector(({ auth }) => auth);
   const [request, response, promptAsync] =
      Google.useIdTokenAuthRequest(config);
   const [reauthPw, setReauthPw] = useState(false);
   const [password, setPassword] = useState("");
   const [errMsg, setErrMsg] = useState({ password: "" });
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const callReauth = async (credential) => {
         await reauthWithCredential(credential);
      };
      if (response?.type === "success") {
         setReauthenticated(true);
         const { id_token } = response.params;
         const credential =
            fbAuthObject.GoogleAuthProvider.credential(id_token);
         callReauth(credential);
      }
   }, [response]);

   const catchError = (code, setErrMsg, lastSection) => {
      if (!handleError(code, setErrMsg)) {
         setErrMsg((prev) => ({
            ...prev,
            [lastSection]: "알수없는 오류가 발생했습니다. 다시 시도해주세요.",
         }));
      }
   };

   const reauthWithCredential = async (credential) => {
      await user.reauthenticateWithCredential(credential);
      setReauthenticated(true);
   };
   const reauthenticate = async () => {
      if (user.providerData[0].providerId === "password") {
         setReauthPw(true);
      } else if (user.providerData[0].providerId === "google.com") {
         try {
            await promptAsync();
         } catch (err) {
            console.log(err);
         }
      }
   };
   const reauthWithPw = async () => {
      try {
         if (!checkPassword(password, setErrMsg)) {
            return;
         }
         setLoading(true);
         const authCredential = await fbAuthObject.EmailAuthProvider.credential(
            user.email,
            password
         );
         await reauthWithCredential(authCredential);
      } catch (err) {
         catchError(err.code, setErrMsg, "password");
      }
      setLoading(false);
   };
   const onChange = (v) => {
      if (errMsg.password) {
         setErrMsg({ password: "" });
      }
      if (v && !/[0-9a-zA-Z.;\-]/.test(v)) {
         setErrMsg({
            password: "영어, 숫자, 특수문자만 가능합니다.",
         });
         return;
      }
      setPassword(v);
   };
   const onClose = () => {
      setReauthVisible(false);
   };

   return (
      <ReauthenticateModal
         visible={reauthVisible}
         reauthenticate={reauthenticate}
         onClose={onClose}
         reauthPw={reauthPw}
         reauthWithPw={reauthWithPw}
         onChange={onChange}
         errMsg={errMsg}
         password={password}
         loading={loading}
      />
   );
}

export default ReauthenticateModalContainer;
