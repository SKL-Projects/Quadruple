import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import logout from "../../auth/container/LogoutFunc";

function Home({ navigation }) {
   const { auth } = useSelector((data) => data);
   const dispatch = useDispatch();
   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <Text>Home Screen</Text>
         </View>
         <View style={styles.login}>
            {auth.signined ? (
               <>
                  <Button
                     title="Log out"
                     onPress={() => logout(auth, dispatch)}
                  />
                  <Button
                     title="Profile"
                     onPress={() => navigation.navigate("Profile")}
                  />
               </>
            ) : (
               <Button
                  title="Log in"
                  onPress={() => navigation.navigate("Auth")}
               />
            )}
         </View>
         <View style={styles.login}>
            <Button
               title="Show cost Map"
               onPress={() => navigation.navigate("Cost")}
            />
         </View>
         <View style={styles.login}>
            <Button
               title="Travel"
               onPress={() => navigation.navigate("Travel")}
            />
         </View>
         <View style={styles.login}>
            <Button
               title="Template"
               onPress={() => navigation.navigate("Template")}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   login: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
   },
});

export default Home;
