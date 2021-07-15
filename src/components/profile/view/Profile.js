import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

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
   nickname: {
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
});
function Profile({ profile, auth, changeAvatar, loading }) {
   console.log(loading);
   return (
      <View style={styles.container}>
         <View style={styles.avatar}>
            <Avatar
               size="xlarge"
               rounded
               activeOpacity={0.7}
               containerStyle={{ backgroundColor: "purple" }}
               {...(() =>
                  profile.avatar
                     ? { source: { uri: profile.avatar } }
                     : { title: profile?.nickname?.slice(0, 2) })()}>
               {loading ? (
                  <ActivityIndicator
                     style={styles.loading}
                     size={30}
                     color="white"
                  />
               ) : (
                  <Avatar.Accessory
                     icon={{ name: "pencil", type: "fontawesome" }}
                     size={40}
                     onPress={changeAvatar}
                  />
               )}
            </Avatar>

            <Text style={styles.nickname}>
               {profile.nickname || auth.email}
            </Text>
         </View>
         <View style={styles.content}>
            <ListItem bottomDivider>
               <Text>이메일</Text>
               <ListItem.Content>
                  <ListItem.Title>{auth.email}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}></View>
      </View>
   );
}

export default Profile;
