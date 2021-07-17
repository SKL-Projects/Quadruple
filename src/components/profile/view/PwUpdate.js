import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import { fbAuth, fbAuthObject } from "../../../../firebase";
import CustomModal from "../../utils/CustomModal";
import handleError from "../../utils/HandleAuthErr";

function PwUpdate({ visible, setVisible }) {
   const [password, setPassword] = useState("");
   const [success, setSuccess] = useState(false);
   const [errMsg, setErrMsg] = useState({ password: "" });

   const onPasswordUpdate = async (pw) => {
      if (success) {
         return;
      }
      try {
         /*
         await fbAuth.currentUser.reauthenticateWithCredential(
            fbAuthObject.AuthCredential.fromJSON({
               providerId: "password",
               signInMethod: "password",
            })
         );*/
         await fbAuth.currentUser.updatePassword(pw);
         setSuccess(true);
      } catch (err) {
         handleError(err.code, setErrMsg);
         console.log(err.code);
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
   const clear = () => {
      setPassword("");
      setErrMsg({ password: "" });
      setSuccess(false);
      setVisible(false);
   };

   const title = <ModalTitle title="비밀번호 변경" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton
            text={"변경"}
            onPress={() => onPasswordUpdate(password)}
         />
         <ModalButton text={success ? "확인" : "취소"} onPress={clear} />
      </ModalFooter>
   );

   return (
      <CustomModal visible={visible} title={title} footer={footer}>
         <View style={styles.container}>
            {success ? (
               <Text style={{ fontSize: 20 }}>
                  비밀번호 변경에 성공하셨습니다.
               </Text>
            ) : (
               <>
                  <Text style={{ fontSize: 20 }}>
                     새로운 비밀번호를 입력해주세요.
                  </Text>
                  <Input
                     style={{ width: "80%" }}
                     secureTextEntry={true}
                     value={password}
                     errorMessage={errMsg.password}
                     onChangeText={onChange}
                  />
               </>
            )}
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 30,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default PwUpdate;
