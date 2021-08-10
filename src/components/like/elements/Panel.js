import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Button, ListItem } from "react-native-elements";
import theme from "../../../lib/styles/theme";
import { LIST_ITEM_HEIGHT } from "./itemHeight";
import { WINDOW_WIDTH } from "../../../lib/styles/pixels";

function Panel({ likeList, onRemoveBlock, onPressListItem, addTravelBlock }) {
   const renderItem = ({ item }) => {
      return (
         <ListItem.Swipeable
            containerStyle={styles.listItem}
            underlayColor="white"
            onPress={() => onPressListItem(item.location)}
            leftWidth={Math.floor(WINDOW_WIDTH * 0.4)}
            rightWidth={Math.floor(WINDOW_WIDTH * 0.4)}
            leftContent={
               <Button
                  title="일정에 추가"
                  icon={{ name: "edit", color: "white" }}
                  buttonStyle={styles.leftButton}
                  onPress={() => addTravelBlock(item)}
               />
            }
            rightContent={
               <Button
                  title="삭제"
                  icon={{ name: "delete", color: "white" }}
                  buttonStyle={styles.rightButton}
                  onPress={() => onRemoveBlock(item)}
               />
            }>
            <ListItem.Content style={{ paddingLeft: 20 }}>
               <ListItem.Title style={{ fontSize: 18 }}>
                  {item.location.formatted_address}
               </ListItem.Title>
               <ListItem.Subtitle style={{ fontSize: 14 }}>
                  {item.location.name}
               </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
         </ListItem.Swipeable>
      );
   };

   return (
      <>
         {likeList?.length ? (
            <FlatList
               data={likeList}
               keyExtractor={(item, idx) => `dayGroup_${idx}`}
               renderItem={renderItem}
               ListFooterComponent={<View style={styles.dayContainer} />}
            />
         ) : (
            <View>
               <Text>찜 블록을 추가하세요!</Text>
            </View>
         )}
      </>
   );
}

const styles = StyleSheet.create({
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
