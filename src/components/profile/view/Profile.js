import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import Header from "./Header";
const styles = StyleSheet.create({
   container: {
      flex: 1,
      height: Dimensions.get("window").height,
      backgroundColor: "#fff",
   },
   avatar: {
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
   },
   content: {},
   bottomBar: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
   },
});
function Profile({
   user,
   changeAvatar,
   changeDisplayName,
   onPressOnEdit,
   onEdit,
   onChange,
   editUserInfo,
   showChangePassword,
   showRemoveUser,
   errMsg,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.avatar}>
            <Header
               user={user}
               changeAvatar={changeAvatar}
               changeDisplayName={changeDisplayName}
               onPressOnEdit={onPressOnEdit}
               onEdit={onEdit}
               onChange={onChange}
               editUserInfo={editUserInfo}
               errMsg={errMsg}
            />
         </View>
         <View style={styles.content}>
            <ListItem bottomDivider>
               <Text>이메일</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.email}</ListItem.Title>
               </ListItem.Content>
               <Text>{!user?.emailVerified && "미인증"}</Text>
            </ListItem>
         </View>
         <View style={styles.bottomBar}>
            {user?.providerData[0].providerId === "password" && (
               <Button
                  title="비밀번호 변경"
                  onPress={showChangePassword}
                  type="clear"
               />
            )}
            <Button
               title="회원탈퇴"
               type="clear"
               color="red"
               titleStyle={{ color: "red" }}
               onPress={showRemoveUser}
            />
         </View>
      </View>
   );
}

export default Profile;
