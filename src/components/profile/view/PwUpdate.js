import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../elements/CustomModal";

function PwUpdate({
   visible,
   password,
   clear,
   onChange,
   onPasswordUpdate,
   errMsg,
   success,
}) {
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
   const footerSuccess = (
      <ModalFooter>
         <ModalButton text="확인" onPress={clear} />
      </ModalFooter>
   );

   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={success ? footerSuccess : footer}>
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
