import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { detailTypes, TRANSIT, WAYPOINT } from "../../../lib/types";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const detailTypesDate = [
   [
      { name: "숙소", value: detailTypes.HOTEL },
      { name: "음식점", value: detailTypes.FOOD },
      { name: "쇼핑", value: detailTypes.SHOPPING },
      { name: "관광", value: detailTypes.SIGHTSEE },
      { name: "액티비티", value: detailTypes.ACTIVITY },
      { name: "기타", value: detailTypes.ETC_WAYPOINT },
   ],
   [
      { name: "자차", value: detailTypes.MY_CAR },
      { name: "기차", value: detailTypes.TRAIN },
      { name: "항공", value: detailTypes.AIRLINE },
      { name: "버스", value: detailTypes.BUS },
      { name: "도보", value: detailTypes.WALKING },
      { name: "기타", value: detailTypes.ETC_TRANSIT },
   ],
];

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
               data={detailTypesDate[type === WAYPOINT ? 0 : 1]}
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
