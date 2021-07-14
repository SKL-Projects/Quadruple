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
   },
   input: {
      width: 400,
   },
   header: {
      flex: 1,
      fontSize: 32,
   },
   inputContainer: {
      flex: 5,
      width: 400,
   },
   button: {
      width: 100,
   },
   buttonPwReset: {
      width: 110,
      position: "absolute",
      left: 0,
   },
});

function Login({
   userInfo,
   onChange,
   login,
   setLogIn,
   onPressLogin,
   errMsg,
   loading,
   wrongPW,
   passwordReset,
   onGoogleSignin,
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
                  value={userInfo.email}
                  style={styles.input}
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
                     width: 400,
                  }}>
                  {wrongPW && (
                     <Button
                        title="비밀번호 찾기"
                        type="clear"
                        containerStyle={styles.buttonPwReset}
                        onPress={passwordReset}
                     />
                  )}
                  <Button
                     title={login ? "Sign Up" : "Log In"}
                     type="clear"
                     containerStyle={styles.button}
                     onPress={() => setLogIn((prev) => !prev)}
                  />
                  <Button
                     title={login ? "Log In" : "Sign Up"}
                     onPress={onPressLogin}
                     loading={loading}
                     containerStyle={styles.button}
                  />
               </View>
               <View style={{ marginTop: 30 }}>
                  <Button
                     title="구글로 로그인하기"
                     type="outline"
                     iconPosition="left"
                     onPress={onGoogleSignin}
                     icon={
                        <Icon
                           name="google"
                           size={15}
                           color="#ea4335"
                           style={{ position: "absolute", left: 30 }}
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
