import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

function RemoveUserModal({
   visible,
   setVisible,
   afterRemove,
   removeUserFunc,
   success,
}) {
   const footer = [
      { text: "탈퇴", textStyle: { color: "red" }, onPress: removeUserFunc },
      { text: "취소", onPress: () => setVisible(false) },
   ];
   const footerOnSuccess = [{ text: "확인", onPress: afterRemove }];

   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader title="주의" hasTitleBar />}
         footer={
            <CustomModalFooter buttons={success ? footerOnSuccess : footer} />
         }>
         <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>
               {success
                  ? "이용해주셔서 감사합니다."
                  : "회원님과 관련된 모든 정보가 삭제됩니다.\n\n정말로 탈퇴하시겠습니까?"}
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

export default RemoveUserModal;
