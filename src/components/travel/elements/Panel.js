import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { basicVetical, end, start } from "../../utils/Graph";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { ScrollView } from "react-native-gesture-handler";
import {
   getSnapOneHeight,
   getSnapZeroHeight,
   LIST_ITEM_HEIGHT,
} from "./itemHeight";

const CustomScrollView = wrapScrollView(ScrollView);

function Panel({ plans, setRegion, curSnap, itemRefs, length }) {
   let cnt = 0;
   const onPressListItem = useCallback((location) => {
      setRegion({
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
         ...location,
      });
   }, []);
   return (
      <CustomScrollView
         style={[
            styles.panel,
            {
               height:
                  curSnap === 0
                     ? getSnapZeroHeight(length)
                     : getSnapOneHeight(length),
            },
         ]}>
         {Object.keys(plans).map((day, idx) => {
            return (
               <View key={`day_${idx}`} style={styles.dayContainer}>
                  <Text style={styles.dayHeader}>{day}</Text>
                  {plans[day].map((item, idx) => {
                     const hour = item.time.getHours();
                     const minute = item.time.getMinutes();
                     return (
                        <ScrollIntoView
                           key={`${day}_${idx}`}
                           ref={itemRefs[cnt++]}>
                           <ListItem
                              key={`${day}_${idx}`}
                              containerStyle={styles.listItem}
                              underlayColor="white"
                              onPress={() => onPressListItem(item.location)}>
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
                        </ScrollIntoView>
                     );
                  })}
               </View>
            );
         })}
      </CustomScrollView>
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
