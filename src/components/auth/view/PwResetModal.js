import React, { useState } from "react";
import { TouchableHighlight } from "react-native";
import { Modal } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { fbAuth } from "../../../../firebase";

function PwResetModal({
   modalVisible,
   setModalVisible,
   email,
   PwResetSended,
   setPwResetSended,
}) {
   const [loadingPwReset, setLoadingPwReset] = useState(false);
   const sendPwResetEmail = async () => {
      setLoadingPwReset(true);
      try {
         await fbAuth.sendPasswordResetEmail(email);
         setPwResetSended(true);
         setUserInfo((prev) => ({ ...prev, password: "" }));
      } catch (err) {
         console.log(err);
      }
      setLoadingPwReset(false);
   };
   return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
               {!loadingPwReset ? (
                  PwResetSended ? (
                     <>
                        <Text style={styles.modalText}>
                           전송이 완료되었습니다.
                        </Text>
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
                        <Text style={styles.modalText}>
                           전송 이메일 : {email}
                        </Text>
                     </>
                  )
               ) : (
                  <>
                     <Text style={styles.modalText}>전송 중....</Text>
                  </>
               )}
               <View
                  style={{
                     width: "30%",
                     flexDirection: "row",
                     justifyContent: `${
                        PwResetSended ? "flex-start" : "space-around"
                     }`,
                  }}>
                  {!loadingPwReset && (
                     <>
                        {!PwResetSended && (
                           <TouchableHighlight
                              style={styles.openButton}
                              onPress={sendPwResetEmail}>
                              <Text style={styles.textStyle}>보내기</Text>
                           </TouchableHighlight>
                        )}
                        <TouchableHighlight
                           style={styles.openButton}
                           onPress={() => {
                              setModalVisible(!modalVisible);
                           }}>
                           <Text style={styles.textStyle}>닫기</Text>
                        </TouchableHighlight>
                     </>
                  )}
               </View>
            </View>
         </View>
      </Modal>
   );
}
const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      width: 70,
      backgroundColor: "#2196F3",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center",
   },
});

export default PwResetModal;
