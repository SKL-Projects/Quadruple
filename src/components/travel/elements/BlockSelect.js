import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { basicVetical, end, start } from "../../utils/Graph";
import { LIST_ITEM_HEIGHT } from "./itemHeight";

function BlockSelect({ plans, flatPlans, selectedIds, setSelectedIds }) {
   const onPressListItem = (id) => {
      let cur = 0,
         isLast = false;
      for (let i = 0; i < flatPlans.length; i++) {
         if (id === flatPlans[i].id) {
            cur = i;
            isLast = i === flatPlans.length - 1;
            break;
         }
      }
      if (selectedIds[0]?.id === id || (isLast && selectedIds[1]?.id === id)) {
         setSelectedIds([]);
      } else if (isLast) {
         setSelectedIds([
            { id: flatPlans[cur - 1].id, idx: cur - 1 },
            { id: flatPlans[cur].id, idx: cur },
         ]);
      } else {
         setSelectedIds([
            { id: flatPlans[cur].id, idx: cur },
            { id: flatPlans[cur + 1].id, idx: cur + 1 },
         ]);
      }
   };
   const checkId = (id) => {
      if (selectedIds[0]?.id === id || selectedIds[1]?.id === id) return true;
      return false;
   };
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
         <ListItem
            containerStyle={stylesFunc(checkId(item.id)).listItem}
            underlayColor="white"
            onPress={() => onPressListItem(item.id)}>
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
      <View style={styles.container}>
         <FlatList data={Object.keys(plans)} renderItem={renderDay} />
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
});

export default BlockSelect;
