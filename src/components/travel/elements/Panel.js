import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { basicVetical, end, start } from "../../utils/Graph";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";

const LIST_ITEM_HEIGHT = 70;

function Panel({ plans, setRegion }) {
   return (
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
                           containerStyle={styles.listItem}
                           underlayColor="white"
                           onPress={() =>
                              setRegion((prev) => ({
                                 ...prev,
                                 ...item.location,
                              }))
                           }>
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
}

const styles = StyleSheet.create({
   panel: {
      padding: 20,
      backgroundColor: theme.color.white,
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

export default React.memo(Panel);
