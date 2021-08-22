import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

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
   const footer = [
      { text: "재로그인", onPress: reauthenticate },
      { text: "취소", onPress: onClose },
   ];

   const footerPw = [
      { text: "확인", onPress: reauthWithPw },
      { text: "취소", onPress: onClose },
   ];

   // 재로그인 누르면, 구글 회원일 경우 구글로그인창으로,
   // 일반회원일경우 비밀번호 입력창이 나옴
   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader title="재로그인" hasTitleBar />}
         footer={<CustomModalFooter buttons={reauthPw ? footerPw : footer} />}>
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
