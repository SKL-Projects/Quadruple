import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../../../lib/styles/theme";
import { TRANSIT, WAYPOINT } from "../../../lib/types";
import BlockInfoInput from "../elements/BlockInfoInput";
import BlockSelect from "../elements/BlockSelect";
import SelectDate from "../elements/SelectDate";
import SelectLocation from "../elements/SelectLocation";

// 메모, 예산 안함

function AddBlock({ plans, region, setRegion }) {
   const [title, setTitle] = useState("");
   const [date, setDate] = useState(new Date());
   const [type, setType] = useState(WAYPOINT);
   const [detailType, setDetailType] = useState(0);
   const [errMsg, setErrMsg] = useState({ title: "", time: "" });
   const [flatPlans, setFlatPlans] = useState([]);
   const [selectedIds, setSelectedIds] = useState([]);

   useEffect(() => {
      const reg = region;
      setFlatPlans(
         Object.keys(plans)
            .map((day) => plans[day].map((item) => item))
            .flat(2)
      );
      return () => setRegion(reg);
   }, []);

   const label = useCallback(
      (content) => <Text style={styles.label}>{content}</Text>,
      []
   );
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
            title: "최소 한글자를 적어주세요.",
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

      //로케이션은 양쪽 경유지 사이로. -> 다 똑같이
      //direction도 양쪽 경우지로
      let obj = {
         id: 123123, // uuid로
         createdWhere: "travel",
         title: title,
         date: date,
         type: TRANSIT,
         detailType: detailType,
         location: { latitude: region.latitude, longitude: region.longitude },
      };

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

      let obj = {
         id: 123123, // uuid로
         createdWhere: "travel",
         title: title,
         date: date,
         type: WAYPOINT,
         detailType: detailType,
         location: { latitude: region.latitude, longitude: region.longitude },
      };

      //파이어베이스 추가 + 로딩
      //리프레시

      //다시 리스트로 돌아가기
   };

   return (
      <ScrollView style={[styles.container]}>
         <BlockInfoInput
            title={title}
            type={type}
            onChangeTitle={onChangeTitle}
            setType={setType}
            detailType={detailType}
            setDetailType={setDetailType}
            errMsg={errMsg}
         />

         {type === WAYPOINT ? (
            <>
               <SelectDate
                  date={date}
                  setDate={setDate}
                  errMsg={errMsg.time}
                  setErrMsg={setErrMsg}
               />
               <SelectLocation region={region} />
            </>
         ) : (
            <View style={styles.line}>
               {label("연결시킬 블록을 선택해주세요.")}
               <BlockSelect
                  plans={plans}
                  flatPlans={flatPlans}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
               />
            </View>
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
   completeButtonContainer: {
      width: "100%",
      alignItems: "center",
   },
   buttonContainerStyle: {
      width: 100,
   },
   line: {
      marginBottom: 50,
   },
});

export default AddBlock;
