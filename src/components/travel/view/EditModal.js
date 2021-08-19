import React, { useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Input } from "react-native-elements";
import { bindDetailTypes, END, START, WAYPOINT } from "../../../lib/types";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";
import CustomModal from "../../elements/CustomModal";

function EditModal({
   visible,
   close,
   editElement,
   onChangeTitle,
   detailType,
   setDetailType,
   onChangeMemo,
   errMsg,
   editSubmit,
}) {
   // react-native-modals 에서 쓰이는 모든 props 쓸 수 있음.
   // 여기선 간단히 텍스트랑 버튼을 경우 함수만 넣어둠
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

   // 자주쓰이는 라벨을 위해 따로 함수를 빼줌.
   const label = useCallback(
      (content) => <Text style={styles.label}>{content}</Text>,
      []
   );

   // 타입이 출발, 끝이면 세부타입은 보여주지 않음
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
                  defaultValue={editElement.title}
                  placeholder="블록의 제목을 입력해주세요."
                  onChangeText={onChangeTitle}
                  errorMessage={errMsg}
               />
            </View>
            {editElement.type !== START && editElement.type !== END && (
               <View style={styles.line}>
                  {label("세부타입")}
                  <FlatList
                     data={
                        bindDetailTypes[editElement.type === WAYPOINT ? 0 : 1]
                     }
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
                              stylesFunc(detailType === item.value)
                                 .buttonContainer
                           }
                           onPress={() => setDetailType(item.value)}
                        />
                     )}
                  />
               </View>
            )}
            <View style={styles.line}>
               {label("간단 메모")}
               <Input
                  defaultValue={editElement.memo}
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
