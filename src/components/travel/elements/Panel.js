import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { basicVetical, end, start } from "../../utils/Graph";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { ScrollView } from "react-native-gesture-handler";
import { LIST_ITEM_HEIGHT } from "./itemHeight";

import { FlatList } from "react-native";
import { useSelector } from "react-redux";

const CustomScrollView = wrapScrollView(ScrollView);

function Panel({ plans, setRegion, itemRefs }) {
   const plansMap = useSelector(({ planMap }) => planMap);
   const onPressListItem = useCallback((location, id, direction) => {
      let deltas = {
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
      };
      if (direction) {
         deltas["latitudeDelta"] =
            Math.abs(direction[0]?.latitude - direction[1]?.latitude) * 2;
         deltas["longitudeDelta"] =
            Math.abs(direction[0]?.longitude - direction[1]?.longitude) * 2;
      }
      setRegion({
         ...deltas,
         ...location,
         id: id,
      });
   }, []);

   const renderDay = ({ item, index }) => (
      <View key={`day_${index}`} style={styles.dayContainer}>
         <FlatList
            data={plans[item]}
            keyExtractor={(item, idx) => `${item.time}_${idx}`}
            renderItem={renderItem}
            ListHeaderComponent={<Text style={styles.dayHeader}>{item}</Text>}
         />
      </View>
   );
   const renderItem = ({ item }) => {
      const hour = item.time.getHours();
      const minute = item.time.getMinutes();
      return (
         <ScrollIntoView ref={itemRefs[plansMap.get(item.id).idx]}>
            <ListItem
               containerStyle={styles.listItem}
               underlayColor="white"
               onPress={() =>
                  onPressListItem(item.location, item.id, item.direction)
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
                        ? basicVetical(LIST_ITEM_HEIGHT, item.type)
                        : end(LIST_ITEM_HEIGHT)
                     : start(LIST_ITEM_HEIGHT)}
               </View>
               <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 20 }}>
                     {item.type !== "transit"
                        ? `${hour < 10 ? `0${hour}` : hour}:${
                             minute < 10 ? `0${minute}` : minute
                          }          `
                        : ""}
                     {item.title}
                  </ListItem.Title>
               </ListItem.Content>
               <ListItem.Chevron />
            </ListItem>
         </ScrollIntoView>
      );
   };

   return (
      <CustomScrollView keyboardShouldPersistTaps="always">
         <FlatList
            data={Object.keys(plans)}
            renderItem={renderDay}
            nestedScrollEnabled={false}
         />
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

export default Panel;
