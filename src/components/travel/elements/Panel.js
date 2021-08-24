import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { graph } from "../../utils/Graph";
import { Button, ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { LIST_ITEM_HEIGHT } from "./itemHeight";
import DraggableFlatList from "react-native-draggable-flatlist";
import { WINDOW_WIDTH } from "../../../lib/styles/pixels";
import { END, START, TRANSIT } from "../../../lib/types";
import { hhmm } from "../../utils/DateString";
import SwipeWhenNotActive from "./SwipeWhenNotActive";

function Panel({
   plans,
   listRef,
   openEditModal,
   onDragEnd,
   onRemoveBlock,
   onPressListItem,
}) {
   let dateHeader = plans[0].date;

   const renderItem = ({ item, index, drag, isActive }) => {
      const isDifferent = dateHeader !== item.date;
      dateHeader = item.date;
      return (
         <>
            {
               // 일별로 분리한 것중 가장 위에 있는 것만 날짜랑 같이 렌더함.
               // 길게 눌러서 띄었을때는 안보이도록 함
               // 맨 첫번째 날짜는 blank를 안주기 위해 flattlist 의 header로 줌.
               isDifferent && !isActive && (
                  <>
                     <View style={styles.dayBlank} />
                     <Text style={styles.dayHeader}>{item.date}</Text>
                  </>
               )
            }
            <SwipeWhenNotActive
               isActive={isActive}
               containerStyle={[
                  styles.listItem,
                  stylesFunc(isActive).listItemElevation, // 길게 눌러서 띄었을때 그림자 강화
               ]}
               underlayColor="white"
               onPress={() =>
                  onPressListItem(item.location, item.id, index, item.direction)
               }
               onLongPress={drag}
               leftWidth={Math.floor(WINDOW_WIDTH * 0.4)}
               rightWidth={Math.floor(WINDOW_WIDTH * 0.4)}
               leftContent={
                  <Button
                     title="수정"
                     icon={{ name: "edit", color: "white" }}
                     buttonStyle={styles.leftButton}
                     onPress={() => openEditModal(item)}
                  />
               }
               {...(item.type !== START &&
                  item.type !== END && {
                     rightContent: (
                        <Button
                           title="삭제"
                           icon={{ name: "delete", color: "white" }}
                           buttonStyle={styles.rightButton}
                           onPress={() => onRemoveBlock(item.id, index)}
                        />
                     ),
                  })}>
               {graph(item.type)}
               <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 20 }}>
                     {item.type !== TRANSIT ? `${hhmm(item.time)}   ` : ""}
                     {item.title}
                  </ListItem.Title>
               </ListItem.Content>
               <ListItem.Chevron />
            </SwipeWhenNotActive>
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
         activationDistance={0}
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
   dayBlank: {
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
