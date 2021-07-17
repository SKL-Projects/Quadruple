import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
   ModalButton,
   ModalContent,
   ModalFooter,
   ModalTitle,
} from "react-native-modals";
import { useDispatch } from "react-redux";
import { fbAuth } from "../../../../firebase";
import { signout } from "../../../modules/auth";
import CustomModal from "../../utils/CustomModal";

function RemoveUserModal({ visible, setVisible, navigation }) {
   const [success, setSuccess] = useState(false);
   const dispatch = useDispatch();

   const removeUser = async () => {
      try {
         await fbAuth.currentUser.delete();
         setSuccess(true);
      } catch (err) {
         console.log(err.code);
      }
   };
   const title = <ModalTitle title="주의" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton
            text="삭제"
            textStyle={{ color: "red" }}
            onPress={removeUser}
         />
         <ModalButton text="취소" onPress={() => setVisible(false)} />
      </ModalFooter>
   );
   const footerOnSuccess = (
      <ModalFooter>
         <ModalButton
            text="확인"
            onPress={() => {
               dispatch(signout());
               navigation.navigate("Home");
            }}
         />
      </ModalFooter>
   );
   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={success ? footerOnSuccess : footer}>
         <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>
               회원님과 관련된 모든 정보가 삭제됩니다.
               {"\n\n"}
               정말로 탈퇴하시겠습니까?
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
