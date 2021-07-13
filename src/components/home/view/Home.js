import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

function Home({ navigation }) {
   return (
      <View style={styles.container}>
         <LinearGradient
            colors={['#7f7fd5', '#86a8e7', '#91eae4']}
            style={styles.container}>
            <View style={styles.content}>
               <Text>Home Screen</Text>
            </View>
            <View style={styles.login}>
               <Button
                  title="Log in"
                  onPress={() => navigation.navigate("Auth")}
               />
               <Button
                  title="Template"
                  onPress={() => navigation.navigate("Template")}
               />
            </View>
         </LinearGradient>
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
      flexDirection: 'row',
   },
});

export default Home;