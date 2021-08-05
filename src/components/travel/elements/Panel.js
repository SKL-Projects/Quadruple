import React, { useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { basicVetical, end, start } from "../../utils/Graph";
import { Button, ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { LIST_ITEM_HEIGHT } from "./itemHeight";
import { Dimensions } from "react-native";
import { removeTravelBlock } from "../../../lib/api/travelBlock";
import DraggableFlatList from "react-native-draggable-flatlist";

function Panel({
   plans,
   setRegion,
   listRef,
   setRefresh,
   openEditModal,
   onDragEnd,
}) {
   const onPressListItem = useCallback((location, id, index, direction) => {
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
         idx: index,
      });
   }, []);

   const removeBlock = useCallback(async (obj) => {
      await removeTravelBlock(
         "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
         1627379541738,
         obj
      );
      setRefresh((prev) => prev + 1);
   }, []);

   let dateHeader = plans[0].date;
   const renderItem = ({ item, index, drag, isActive }) => {
      const isDifferent = dateHeader !== item.date;
      dateHeader = item.date;
      const hour = item.time.getHours();
      const minute = item.time.getMinutes();
      return (
         <>
            {isDifferent && !isActive && (
               <>
                  <View style={styles.dayContainer} />
                  <Text style={styles.dayHeader}>{item.date}</Text>
               </>
            )}
            <ListItem.Swipeable
               containerStyle={[
                  styles.listItem,
                  stylesFunc(isActive).listItemElevation,
               ]}
               underlayColor="white"
               onPress={() =>
                  onPressListItem(item.location, item.id, index, item.direction)
               }
               onLongPress={drag}
               leftWidth={Math.floor(Dimensions.get("window").width * 0.4)}
               rightWidth={Math.floor(Dimensions.get("window").width * 0.4)}
               leftContent={
                  <Button
                     title="수정"
                     icon={{ name: "edit", color: "white" }}
                     buttonStyle={styles.leftButton}
                     onPress={() => openEditModal(item)}
                  />
               }
               {...(item.type !== "start" &&
                  item.type !== "end" && {
                     rightContent: (
                        <Button
                           title="삭제"
                           icon={{ name: "delete", color: "white" }}
                           buttonStyle={styles.rightButton}
                           onPress={() => removeBlock(item)}
                        />
                     ),
                  })}>
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
            </ListItem.Swipeable>
         </>
      );
   };

   return (
      <DraggableFlatList
         onRef={(ref) => {
            listRef.current = ref;
         }}
         data={plans}
         keyExtractor={(item, idx) => `dayGroup_${item.title}_${idx}`}
         renderItem={renderItem}
         onDragEnd={onDragEnd}
         ListHeaderComponent={
            <Text style={styles.dayHeader}>{dateHeader}</Text>
         }
         ListFooterComponent={<View style={styles.dayContainer} />}
      />
   );
}

const stylesFunc = (isActive) =>
   StyleSheet.create({
      listItemElevation: {
         elevation: isActive ? 10 : 3,
      },
   });

const styles = StyleSheet.create({
   panel: {
      padding: 20,
      backgroundColor: theme.color.white,
   },
   dayContainer: {
      height: 80,
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
   leftButton: {
      height: LIST_ITEM_HEIGHT,
      margin: 10,
      borderWidth: 1,
      borderColor: theme.color.white,
      borderBottomLeftRadius: 30,
      borderTopLeftRadius: 30,
   },
   rightButton: {
      height: LIST_ITEM_HEIGHT,
      backgroundColor: "red",
      margin: 10,
      marginRight: 20,
      borderWidth: 1,
      borderColor: theme.color.white,
      borderBottomRightRadius: 30,
      borderTopRightRadius: 30,
   },
});

export default Panel;
