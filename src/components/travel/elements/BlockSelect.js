import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { TRANSIT } from "../../../lib/types";
import { hhmm } from "../../utils/DateString";
import { graph } from "../../utils/Graph";
import { LIST_ITEM_HEIGHT } from "./itemHeight";

function BlockSelect({ plans, selectedIds, setSelectedIds }) {
   const onPressListItem = (idx) => {
      let isLast = idx === plans.length - 1;

      if (selectedIds[0] === idx || (isLast && selectedIds[1] === idx)) {
         setSelectedIds([]);
      } else if (isLast) {
         setSelectedIds([idx - 1, idx]);
      } else {
         setSelectedIds([idx, idx + 1]);
      }
   };

   let dateHeader = plans[0].date;
   const renderItem = ({ item, index }) => {
      const isDifferent = dateHeader !== item.date;
      dateHeader = item.date;
      return (
         <>
            {isDifferent && (
               <>
                  <View style={styles.dayContainer} />
                  <Text style={styles.dayHeader}>{item.date}</Text>
               </>
            )}
            <ListItem
               containerStyle={stylesFunc(selectedIds.includes(index)).listItem}
               underlayColor="white"
               onPress={() => onPressListItem(index)}>
               {graph(item.type)}
               <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 20 }}>
                     {item.type !== TRANSIT
                        ? `${hhmm(item.time)}          `
                        : ""}
                     {item.title}
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </>
      );
   };
   return (
      <View style={styles.container}>
         <FlatList
            data={plans}
            keyExtractor={(item, idx) => `dayGroup_${item.title}_${idx}`}
            renderItem={renderItem}
            ListHeaderComponent={
               <Text style={styles.dayHeader}>{dateHeader}</Text>
            }
         />
      </View>
   );
}
const stylesFunc = (isSelected) =>
   StyleSheet.create({
      listItem: {
         backgroundColor: theme.color.white,
         overflow: "hidden",
         height: LIST_ITEM_HEIGHT,
         width: "95%",
         borderColor: isSelected ? theme.color.highlight : theme.color.white,
         borderWidth: isSelected ? 5 : 1,
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

const styles = StyleSheet.create({
   container: {
      marginTop: 50,
      marginLeft: "5%",
      padding: 10,
      width: "90%",
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 10,
   },
   dayContainer: {
      marginBottom: 80,
   },
   dayHeader: {
      fontSize: 20,
   },
   graphContainer: {},
});

export default BlockSelect;
