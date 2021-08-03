import React, { useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Input } from "react-native-elements";
import { detailTypes, WAYPOINT } from "../../../lib/types";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";
import CustomModal from "../../utils/CustomModal";

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

function EditModal({
   visible,
   close,
   editElement,
   title,
   onChangeTitle,
   detailType,
   setDetailType,
   memo,
   onChangeMemo,
   errMsg,
   editSubmit,
}) {
   const titleProps = { title: "재생목록 추가", hasTitleBar: true };
   const footerButtons = [
      {
         text: "취소",
         onPress: close,
      },
      {
         text: "수정",
         onPress: editSubmit,
      },
   ];
   const label = useCallback(
      (content) => <Text style={styles.label}>{content}</Text>,
      []
   );
   return (
      <CustomModal
         visible={visible}
         rounded={true}
         title={<CustomModalHeader props={titleProps} />}
         footer={<CustomModalFooter buttons={footerButtons} />}>
         <View style={styles.container}>
            <View style={styles.line}>
               {label("제목")}
               <Input
                  placeholder="블록의 제목을 입력해주세요."
                  value={title}
                  onChangeText={onChangeTitle}
                  errorMessage={errMsg}
               />
            </View>
            <View style={styles.line}>
               {label("세부타입")}
               <FlatList
                  data={detailTypesDate[editElement.type === WAYPOINT ? 0 : 1]}
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
      </CustomModal>
   );
}
const stylesFunc = (isSeleted) =>
   StyleSheet.create({
      buttonContainer: {
         width: 80,
         height: 40,
         borderRadius: 5,
         backgroundColor: isSeleted ? "#2196f3" : "gray",
      },
   });

const styles = StyleSheet.create({
   container: {
      width: 300,
      backgroundColor: "#fff",
      padding: 10,
      paddingTop: 30,
   },
   line: {
      marginBottom: 20,
   },
});

export default EditModal;
