import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   topBlank: {
      flex: 1,
   },
   content: {
      flex: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   header: {
      flex: 1,
      fontSize: 32,
   },
   inputContainer: {
      flex: 5,
   },
   input: {
      width: "80vw",
      maxWidth: "300px",
   },
   button: {
      width: "100px",
   },
});

function Login({
   navigation,
   userInfo,
   onChange,
   login,
   setLogIn,
   onPressLogin,
   errMsg,
   loading,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.topBlank} />
         <View style={styles.content}>
            <Text style={styles.header}>{login ? "로그인" : "회원가입"}</Text>
            <View style={styles.inputContainer}>
               <Input
                  placeholder="이메일"
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  style={styles.input}
                  value={userInfo.email}
                  errorMessage={errMsg.email}
                  onChangeText={(value) => onChange("email", value)}
               />
               <Input
                  placeholder="비밀번호"
                  leftIcon={<Icon name="lock" size={24} color="black" />}
                  secureTextEntry={true}
                  style={styles.input}
                  value={userInfo.password}
                  onChangeText={(value) => onChange("password", value)}
                  errorMessage={errMsg.password}
               />
               {!login && (
                  <Input
                     placeholder="비밀번호 확인"
                     leftIcon={<Icon name="lock" size={24} color="black" />}
                     secureTextEntry={true}
                     style={styles.input}
                     value={userInfo.passwordCheck}
                     errorMessage={errMsg.passwordCheck}
                     onChangeText={(value) => onChange("passwordCheck", value)}
                  />
               )}
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "flex-end",
                  }}>
                  <Button
                     title={login ? "Sign Up" : "Log In"}
                     type="clear"
                     onPress={() => setLogIn((prev) => !prev)}
                     containerStyle={styles.button}
                  />
                  <Button
                     title={login ? "Log In" : "Sign Up"}
                     containerStyle={styles.button}
                     onPress={onPressLogin}
                     loading={loading}
                  />
               </View>
               <View style={{ marginTop: 30 }}>
                  <Button
                     title="구글로 로그인하기"
                     type="outline"
                     iconPosition="left"
                     icon={
                        <Icon
                           name="google"
                           size={15}
                           color="#ea4335"
                           style={{ position: "absolute", left: "50px" }}
                        />
                     }
                  />
               </View>
            </View>
         </View>
      </View>
   );
}

export default Login;
