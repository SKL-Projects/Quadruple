import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { config } from "../../utils/GoogleAuthConfig";
import ReauthenticateModal from "../view/ReauthenticateModal";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { checkPassword } from "../../utils/HandleAuthErr";
import { fbAuth } from "../../../../firebase";

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

   useEffect(() => {
      if (response?.type === "success") {
         setReauthenticated(true);
      }
   }, [response]);

   const reauthenticate = async () => {
      if (user.providerData[0].providerId === "password") {
         setReauthPw(true);
      } else if (user.providerData[0].providerId === "google") {
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
         const resp = await fbAuth.signInWithEmailAndPassword(
            user.email,
            password
         );
         console.log(resp);
         const res = await user.reauthenticateWithCredential(resp);
         console.log(res);
      } catch (err) {
         console.log(err);
      }
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
      />
   );
}

export default ReauthenticateModalContainer;
