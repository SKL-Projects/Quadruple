import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import GoogleMapContainer from "../container/GoogleMapContainer";
import BottomSheet from "reanimated-bottom-sheet";
import { ListItem } from "react-native-elements";

const arr = Array(100).fill("내용");
function Travel() {
   const sheetRef = React.useRef(null);
   const renderContent = () => (
      <View style={styles.panel}>
         {arr.map((item, idx) => {
            return (
               <ListItem
                  key={idx}
                  containerStyle={{ backgroundColor: "#f7f5eee8" }}>
                  <ListItem.Content>
                     <ListItem.Title>{item}</ListItem.Title>
                  </ListItem.Content>
               </ListItem>
            );
         })}
      </View>
   );
   const renderHeader = () => (
      <View style={styles.header}>
         <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
         </View>
      </View>
   );

   return (
      <View style={styles.viewContainer}>
         <View style={{ position: "absolute", height: "100%" }}>
            <GoogleMapContainer />
         </View>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[500, 250, 50]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={0}
            style={{ backgroundColor: "red" }}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      backgroundColor: "#F5FCFF",
   },
   panel: {
      padding: 20,
      backgroundColor: "#f7f5eee8",
   },
   header: {
      backgroundColor: "#f7f5eee8",
      shadowColor: "#000000",
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
   },
   panelHeader: {
      alignItems: "center",
   },
   panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#00000040",
      marginBottom: 10,
   },
});

export default Travel;
