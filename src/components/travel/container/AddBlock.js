import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../../../lib/styles/theme";
import { WAYPOINT } from "../../../lib/types";
import BlockInfoInput from "../elements/BlockInfoInput";
import SelectLocation from "../elements/SelectLocation";

function AddBlock({ plans, region, height }) {
   const [title, setTitle] = useState("");
   const [date, setDate] = useState(new Date());
   const [type, setType] = useState(WAYPOINT);
   const [detailType, setDetailType] = useState(0);
   const [errMsg, setErrMsg] = useState({ title: "", time: "" });

   const onChangeTitle = useCallback(
      (v) => {
         if (errMsg.title) {
            console.log(errMsg.title);
            setErrMsg((prev) => ({ ...prev, title: "" }));
         }
         setTitle(v);
      },
      [errMsg.title]
   );
   const onCompleteWaypoint = () => {
      if (title.length === 0) {
         setErrMsg((prev) => ({
            ...prev,
            title: "적어도 한글자를 적어주세요.",
         }));
         return;
      }
      date.setSeconds(0);
      date.setMilliseconds(0);
      // 겹치는 시간 있는지 확인
      let check = false;
      Object.keys(plans).forEach((day) => {
         if (check) return;
         plans[day].forEach((item) => {
            if (check) return;
            if (item.time.getTime() === date.getTime()) {
               setErrMsg((prev) => ({
                  ...prev,
                  time: "이미 같은 시간대의 경유지 블록이 있습니다!",
               }));
               check = true;
            }
         });
      });
      if (check) return;

      //파이어베이스 추가 + 로딩
      //리프레시

      //다시 리스트로 돌아가기
   };
   const onCompleteTransit = () => {
      if (title.length === 0) {
         setErrMsg((prev) => ({
            ...prev,
            title: "적어도 한글자를 적어주세요.",
         }));
         return;
      }

      //파이어베이스 추가 + 로딩
      //리프레시

      //다시 리스트로 돌아가기
   };

   return (
      <ScrollView style={[styles.container]}>
         <BlockInfoInput
            title={title}
            onChangeTitle={onChangeTitle}
            onCompleteWaypoint={onCompleteWaypoint}
            onCompleteTransit={onCompleteTransit}
            date={date}
            setDate={setDate}
            type={type}
            setType={setType}
            detailType={detailType}
            setDetailType={setDetailType}
            errMsg={errMsg}
            setErrMsg={setErrMsg}
            region={region}
         />
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: 100,
      marginBottom: 60,
      backgroundColor: theme.color.white,
   },
});

export default AddBlock;
