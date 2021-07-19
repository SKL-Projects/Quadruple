import React, { useState } from "react";
import PwUpdate from "../view/PwUpdate";
import handleError, { checkPassword } from "../../utils/HandleAuthErr";
import testPassword from "../../utils/testPassword";
import { fbAuth } from "../../../../firebase";

function PwUpdateContainer({ visible, setVisible }) {
   const [password, setPassword] = useState("");
   const [success, setSuccess] = useState(false);
   const [errMsg, setErrMsg] = useState({ password: "" });
   const [loading, setLoading] = useState(false);

   const onPasswordUpdate = async (pw) => {
      if (success) {
         return;
      } else if (!checkPassword(pw, setErrMsg)) {
         return;
      }
      try {
         setLoading(true);
         await fbAuth.currentUser.updatePassword(pw);
         setSuccess(true);
      } catch (err) {
         handleError(err.code, setErrMsg);
         console.log(err.code);
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
   const clear = () => {
      setPassword("");
      setErrMsg({ password: "" });
      setSuccess(false);
      setVisible(false);
   };
   return (
      <PwUpdate
         visible={visible}
         password={password}
         clear={clear}
         onChange={onChange}
         onPasswordUpdate={onPasswordUpdate}
         errMsg={errMsg}
         success={success}
         loading={loading}
      />
   );
}

export default PwUpdateContainer;
