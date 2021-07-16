import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar, Icon, Input, Button } from "react-native-elements";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   avatar: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 4,
   },
   name: {
      marginTop: 20,
      fontSize: 32,
   },
   loading: {
      position: "absolute",
      right: 0,
      top: 110,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "gray",
   },
   bottomBar: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   editName: {
      position: "relative",
      bottom: 20,
      left: 100,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "gray",
   },
});
function Profile({
   user,
   changeAvatar,
   loading,
   changeDisplayName,
   onPressOnEdit,
   onEdit,
   onChange,
   editUserInfo,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.avatar}>
            <Avatar
               size="xlarge"
               rounded
               activeOpacity={0.7}
               containerStyle={{ backgroundColor: "purple" }}
               {...(() => {
                  return user.photoURL
                     ? { source: { uri: user.photoURL } }
                     : { title: user.displayName.slice(0, 2) };
               })()}>
               {loading.photo ? (
                  <ActivityIndicator
                     style={styles.loading}
                     size={30}
                     color="white"
                  />
               ) : (
                  <Avatar.Accessory
                     icon={{
                        name: "pencil",
                        type: "font-awesome",
                        raised: true,
                     }}
                     size={40}
                     onPress={changeAvatar}
                  />
               )}
            </Avatar>
            {onEdit.name ? (
               <View style={{ flexDirection: "row", width: "50%" }}>
                  <Input
                     containerStyle={{ ...styles.name }}
                     value={editUserInfo.name}
                     onChangeText={(value) => onChange("name", value)}
                     placeholder="성함"
                  />
                  <Button
                     title="수정"
                     type="clear"
                     containerStyle={{ top: 20 }}
                     onPress={changeDisplayName}
                  />
               </View>
            ) : (
               <>
                  <Text style={styles.name}>{user?.displayName}</Text>
                  {loading.name ? (
                     <ActivityIndicator
                        style={styles.editName}
                        size={20}
                        color="white"
                     />
                  ) : (
                     <Icon
                        name="pencil"
                        type="font-awesome"
                        color="white"
                        size={20}
                        containerStyle={styles.editName}
                        onPress={() => onPressOnEdit("name", user.displayName)}
                     />
                  )}
               </>
            )}
         </View>
         <View style={styles.content}>
            <ListItem bottomDivider>
               <Text>이메일</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.email}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}></View>
      </View>
   );
}

export default Profile;
