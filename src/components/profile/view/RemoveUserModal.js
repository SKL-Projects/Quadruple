import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../elements/CustomModal";

function RemoveUserModal({
   visible,
   setVisible,
   afterRemove,
   removeUserFunc,
   success,
}) {
   const title = <ModalTitle title="주의" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton
            text="탈퇴"
            textStyle={{ color: "red" }}
            onPress={removeUserFunc}
         />
         <ModalButton text="취소" onPress={() => setVisible(false)} />
      </ModalFooter>
   );
   const footerOnSuccess = (
      <ModalFooter>
         <ModalButton text="확인" onPress={afterRemove} />
      </ModalFooter>
   );
   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={success ? footerOnSuccess : footer}>
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
