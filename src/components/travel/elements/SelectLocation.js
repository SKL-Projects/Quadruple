import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
function SelectLocation({ region, errMsg }) {
   return (
      <View style={styles.container}>
         <View style={styles.headerContaier}>
            <Text style={styles.headerText}>
               상단에서 추가하실 블록의 위치를 검색해주세요.
            </Text>
         </View>
         <View style={styles.border}>
            <View style={styles.addressContainer}>
               <Text style={styles.addressText}>
                  {region.formatted_address}
               </Text>
            </View>
            <View style={styles.addressContainer}>
               <Text style={styles.addressText}>{region.name}</Text>
            </View>
         </View>
         {errMsg ? <Text style={styles.errMsg}>{errMsg}</Text> : <></>}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "100%",
      marginBottom: 50,
      backgroundColor: "#fff",
      alignItems: "center",
   },
   headerContaier: {
      width: "100%",
      height: 30,
      marginBottom: 30,
   },
   headerText: {
      fontSize: 20,
   },
   border: {
      width: "90%",
      borderWidth: 1,
      borderRadius: 30,
      borderColor: "gray",
      padding: 10,
   },
   addressContainer: {
      width: "90%",
      height: 20,
      marginBottom: 20,
   },
   addressText: {
      fontSize: 15,
   },
   errMsg: {
      fontSize: 15,
      color: "red",
   },
});

export default SelectLocation;
