import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../utils/CustomModal";

function ReauthenticateModal({ reauthenticate, onClose, visible, success }) {
   const title = <ModalTitle title="재인증" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton text="취소" onPress={onClose} />
         <ModalButton text="재로그인" onPress={reauthenticate} />
      </ModalFooter>
   );
   const footerOnSuccess = (
      <ModalFooter>
         <ModalButton text="확인" onPress={onClose} />
      </ModalFooter>
   );
   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={success ? footerOnSuccess : footer}>
         <View style={styles.container}>
            <Text
               style={{
                  fontSize: 20,
                  alignItems: "center",
               }}>
               {success ? (
                  <>
                     성공하셨습니다.{"\n\n"}확인을 눌러 창을 끄고 계속
                     진행해주십쇼.
                  </>
               ) : (
                  "비밀번호 변경/회원탈퇴를 위해선 재로그인이 필요합니다."
               )}
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

export default ReauthenticateModal;
