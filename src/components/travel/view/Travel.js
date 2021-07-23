import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import GoogleMapContainer from "../container/GoogleMapContainer";
import BottomSheet from "reanimated-bottom-sheet";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { basicVetical, end, start } from "../../utils/Graph";

const LIST_ITEM_HEIGHT = 70;

function Travel({ sheetRef, plans, length, markers }) {
   const renderContent = () => (
      <View style={styles.panel}>
         {Object.keys(plans).map((day, idx) => {
            return (
               <View key={`day_${idx}`} style={styles.dayContainer}>
                  <Text style={styles.dayHeader}>{day}</Text>
                  {plans[day].map((item, idx) => {
                     const hour = item.time.getHours();
                     const minute = item.time.getMinutes();
                     return (
                        <ListItem
                           key={`${day}_${idx}`}
                           containerStyle={styles.listItem}>
                           <View
                              style={{
                                 width: 60,
                                 justifyContent: "center",
                                 alignItems: "center",
                                 padding: 0,
                              }}>
                              {item.type !== "start"
                                 ? item.type !== "end"
                                    ? basicVetical(LIST_ITEM_HEIGHT)
                                    : end(LIST_ITEM_HEIGHT)
                                 : start(LIST_ITEM_HEIGHT)}
                           </View>
                           <ListItem.Content>
                              <ListItem.Title style={{ fontSize: 20 }}>
                                 {hour < 10 ? `0${hour}` : hour}:
                                 {minute < 10 ? `0${minute}` : minute}
                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 {item.title}
                              </ListItem.Title>
                           </ListItem.Content>
                           <ListItem.Chevron />
                        </ListItem>
                     );
                  })}
               </View>
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
            <GoogleMapContainer markersInput={markers} />
         </View>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[
               length * LIST_ITEM_HEIGHT,
               length * LIST_ITEM_HEIGHT * 0.66,
               50,
            ]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={1}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      backgroundColor: theme.color.white,
   },
   panel: {
      padding: 20,
      backgroundColor: theme.color.white,
   },
   header: {
      backgroundColor: theme.color.white,
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
   dayContainer: {
      marginBottom: 80,
   },
   dayHeader: {
      fontSize: 20,
   },
   listItem: {
      backgroundColor: theme.color.white,
      overflow: "hidden",
      height: LIST_ITEM_HEIGHT,
      width: "95%",
      borderColor: theme.color.white,
      borderWidth: 1,
      borderRadius: 30,
      margin: 10,
      padding: 0,
      paddingLeft: 5,
      paddingRight: 5,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 3,
   },
});

export default Travel;
