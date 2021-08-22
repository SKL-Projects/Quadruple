import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

function VerifyEmailModal({ visible, onCloseSentEmail }) {
   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader title="안내" hasTitleBar />}
         footer={
            <CustomModalFooter
               buttons={[{ text: "확인", onPress: onCloseSentEmail }]}
            />
         }>
         <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>
               인증 이메일이 전송되었습니다.
               {"\n\n"}
               입력하신 이메일의 메일함을 확인하시고, 링크를 눌러 인증해주세요.
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
