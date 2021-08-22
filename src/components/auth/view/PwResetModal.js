import React from "react";
import { StyleSheet, Text } from "react-native";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";

function PwResetModal({
   modalVisible,
   setModalVisible,
   email,
   PwResetSended,
   sendPwResetEmail,
}) {
   const footer = [
      {
         text: "보내기",
         onPress: sendPwResetEmail,
      },
      {
         text: "닫기",
         onPress: () => setModalVisible(!modalVisible),
         textStyle: {
            color: "red",
         },
      },
   ];

   const footerSent = [
      {
         text: "닫기",
         onPress: () => setModalVisible(!modalVisible),
         textStyle: {
            color: "red",
         },
      },
   ];

   return (
      <CustomModal
         visible={modalVisible}
         footer={
            <CustomModalFooter buttons={PwResetSended ? footerSent : footer} />
         }>
         {PwResetSended ? (
            <>
               <Text style={styles.modalText}>전송이 완료되었습니다.</Text>
               <Text style={styles.modalText}>
                  이메일을 확인하시고, 비밀번호를 재설정한 후 다시
                  로그인해주세요.
               </Text>
            </>
         ) : (
            <>
               <Text style={styles.modalText}>
                  비밀번호 재설정 메일을 보내시겠습니까?
               </Text>
               <Text style={styles.modalText}>전송 이메일 : {email}</Text>
            </>
         )}
      </CustomModal>
   );
}
const styles = StyleSheet.create({
   modalText: {
      marginBottom: 15,
      textAlign: "center",
   },
});

export default PwResetModal;
