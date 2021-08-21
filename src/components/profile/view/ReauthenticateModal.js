import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../elements/CustomModal";

function ReauthenticateModal({
   reauthenticate,
   onClose,
   visible,
   reauthPw,
   reauthWithPw,
   onChange,
   errMsg,
   password,
}) {
   const title = <ModalTitle title="재인증" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton text="취소" onPress={onClose} />
         <ModalButton text="재로그인" onPress={reauthenticate} />
      </ModalFooter>
   );
   const footerPw = (
      <ModalFooter>
         <ModalButton text="확인" onPress={reauthWithPw} />
      </ModalFooter>
   );
   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={reauthPw ? footerPw : footer}>
         <View style={styles.container}>
            {reauthPw ? (
               <>
                  <Text style={{ fontSize: 20 }}>
                     현재 비밀번호를 입력해주세요.
                  </Text>
                  <Input
                     secureTextEntry={true}
                     value={password}
                     errorMessage={errMsg.password}
                     onChangeText={onChange}
                  />
               </>
            ) : (
               <Text
                  style={{
                     fontSize: 20,
                     alignItems: "center",
                  }}>
                  비밀번호 변경/회원탈퇴를 위해선 재로그인이 필요합니다.
               </Text>
            )}
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 30,
      paddingBottom: 0,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default ReauthenticateModal;
