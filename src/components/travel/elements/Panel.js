import React, { useCallback } from "react";
import { StyleSheet, View, Text, SectionList } from "react-native";
import { basicVetical, end, start } from "../../utils/Graph";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { LIST_ITEM_HEIGHT } from "./itemHeight";

function Panel({ plans, setRegion, listRef }) {
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

   const renderItem = ({ item }) => {
      const hour = item.time.getHours();
      const minute = item.time.getMinutes();
      return (
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
      );
   };

   return (
      <SectionList
         ref={listRef}
         sections={plans}
         keyExtractor={(item, idx) => `dayGroup_${item.title}_${idx}`}
         renderItem={renderItem}
         renderSectionHeader={({ section: { title } }) => {
            return <Text style={styles.dayHeader}>{title}</Text>;
         }}
         renderSectionFooter={() => <View style={styles.dayContainer} />}
      />
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
