import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
   ModalButton,
   ModalContent,
   ModalFooter,
   ModalTitle,
} from "react-native-modals";
import CustomModal from "../../utils/CustomModal";

function VerifyEmailModal({ visible, onCloseSentEmail }) {
   const title = <ModalTitle title="안내" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton text="확인" onPress={onCloseSentEmail} />
      </ModalFooter>
   );

   return (
      <CustomModal visible={visible} title={title} footer={footer}>
         <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>
               인증 이메일이 전송되었습니다.
               {"\n\n"}
               입력하신 이메일의 메일함을 확인하시고,
               {"\n\n"}링크를 눌러 인증해주세요.
            </Text>
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

export default VerifyEmailModal;
