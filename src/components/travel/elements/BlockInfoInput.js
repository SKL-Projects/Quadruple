import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { bindDetailTypes, TRANSIT, WAYPOINT } from "../../../lib/types";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

function BlockInfoInput({
   title,
   type,
   onChangeTitle,
   setType,
   detailType,
   setDetailType,
   errMsg,
   cost,
   memo,
   onChangeMemo,
   onChangeCost,
}) {
   const label = useCallback(
      (content) => <Text style={styles.label}>{content}</Text>,
      []
   );

   return (
      <View>
         <View style={styles.line}>
            {label("제목")}
            <Input
               placeholder="블록의 제목을 입력해주세요."
               value={title}
               onChangeText={onChangeTitle}
               errorMessage={errMsg.title}
            />
         </View>
         <View style={styles.line}>
            {label("타입")}
            <View style={styles.typeContainer}>
               <Button
                  title="경유지"
                  buttonStyle={stylesFunc(type === WAYPOINT).buttonContainer}
                  onPress={() => {
                     setType(WAYPOINT);
                     setDetailType(0);
                  }}
               />
               <Button
                  title="이동"
                  buttonStyle={stylesFunc(type === TRANSIT).buttonContainer}
                  onPress={() => {
                     setType(TRANSIT);
                     setDetailType(0);
                  }}
               />
            </View>
         </View>
         <View style={styles.line}>
            {label("세부타입")}
            <FlatList
               data={bindDetailTypes[type === WAYPOINT ? 0 : 1]}
               keyExtractor={(item) => item.value}
               numColumns={3}
               columnWrapperStyle={{
                  width: "100%",
                  justifyContent: "space-evenly",
                  marginBottom: 20,
               }}
               renderItem={({ item }) => (
                  <Button
                     title={item.name}
                     buttonStyle={
                        stylesFunc(detailType === item.value).buttonContainer
                     }
                     onPress={() => setDetailType(item.value)}
                  />
               )}
            />
         </View>
         <View
            style={[
               styles.line,
               { flexDirection: "row", justifyContent: "space-between" },
            ]}>
            {label("예상 지출액")}
            <Input
               placeholder="금액을 입력해주세요."
               value={ThousandSeperator(cost)}
               onChangeText={onChangeCost}
               errorMessage={errMsg.cost}
               containerStyle={{ width: 200 }}
            />
         </View>
         <View style={styles.line}>
            {label("간단 메모")}
            <Input
               value={memo}
               onChangeText={onChangeMemo}
               multiline
               maxLength={50}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   line: {
      marginBottom: 50,
   },
   label: {
      fontSize: 18,
      paddingBottom: 10,
   },
   typeContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
   },
   detailType: {
      marginBottom: 10,
   },
});

const stylesFunc = (isSeleted) =>
   StyleSheet.create({
      buttonContainer: {
         width: 100,
         height: 40,
         borderRadius: 5,
         backgroundColor: isSeleted ? "#2196f3" : "gray",
      },
   });

export default BlockInfoInput;
