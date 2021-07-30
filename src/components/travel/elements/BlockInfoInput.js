import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, ButtonGroup, Input } from "react-native-elements";
import { detailTypes, TRANSIT, WAYPOINT } from "../../../lib/types";
import BlockSelect from "./BlockSelect";
import SelectDate from "./SelectDate";
import SelectLocation from "./SelectLocation";

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
   onCompleteWaypoint,
   onCompleteTransit,
   date,
   setDate,
   type,
   setType,
   detailType,
   setDetailType,
   onChangeTitle,
   title,
   errMsg,
   setErrMsg,
   region,
}) {
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [showTimePicker, setShowTimePicker] = useState(false);

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
         {type === WAYPOINT ? (
            <>
               <SelectDate
                  date={date}
                  setDate={setDate}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                  showTimePicker={showTimePicker}
                  setShowTimePicker={setShowTimePicker}
                  errMsg={errMsg.time}
                  setErrMsg={setErrMsg}
               />
               <SelectLocation region={region} />
            </>
         ) : (
            <BlockSelect />
         )}

         <View style={styles.completeButtonContainer}>
            <Button
               containerStyle={styles.buttonContainerStyle}
               title="완료"
               titleStyle={{ fontSize: 20 }}
               type="clear"
               onPress={
                  type === WAYPOINT ? onCompleteWaypoint : onCompleteTransit
               }
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
   completeButtonContainer: {
      width: "100%",
      alignItems: "center",
   },
   buttonContainerStyle: {
      width: 100,
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
