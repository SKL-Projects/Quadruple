import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

function PwUpdate({
   visible,
   password,
   clear,
   onChange,
   onPasswordUpdate,
   errMsg,
   success,
}) {
   const footer = [
      {
         text: "변경",
         onPress: () => onPasswordUpdate(password),
      },
      { text: "취소", onPress: clear },
   ];
   const footerSuccess = [
      {
         text: "확인",
         onPress: clear,
      },
   ];

   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader title="비밀번호 변경" hasTitleBar />}
         footer={
            <CustomModalFooter buttons={success ? footerSuccess : footer} />
         }>
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
