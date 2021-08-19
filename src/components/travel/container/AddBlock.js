import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import theme from "../../../lib/styles/theme";
import { END, START, TRANSIT, TRAVEL, WAYPOINT } from "../../../lib/types";
import BlockInfoInput from "../elements/BlockInfoInput";
import BlockSelect from "../elements/BlockSelect";
import SelectDate from "../elements/SelectDate";
import SelectLocation from "../elements/SelectLocation";
import uuid from "react-native-uuid";
import { addTravelBlock } from "../../../lib/api/travelBlock";
import { binarySearch } from "../../utils/lower_bound";

// 메모, 예산 안함

function AddBlock({
   plans,
   region,
   setRegion,
   onPressAddCancel,
   setRefresh,
   setLoading,
}) {
   const [title, setTitle] = useState("");
   const [date, setDate] = useState(plans[0].time);
   const [type, setType] = useState(WAYPOINT);
   const [detailType, setDetailType] = useState(0);
   const [cost, setCost] = useState("");
   const [memo, setMemo] = useState("");
   const [selectedIds, setSelectedIds] = useState([]);
   const [errMsg, setErrMsg] = useState({ title: "", time: "" });

   // 수정 취소시, 이전 region으로 가기 위한 코드
   useEffect(() => {
      const reg = region;
      return () => setRegion(reg);
   }, []);

   useEffect(() => {
      setErrMsg((prev) => ({ ...prev, region: "" }));
   }, [region]);

   const onChangeTitle = useCallback(
      (v) => {
         if (errMsg.title) {
            setErrMsg((prev) => ({ ...prev, title: "" }));
         }
         setTitle(v);
      },
      [errMsg.title]
   );
   const onChangeMemo = useCallback((v) => {
      setMemo(v);
   }, []);

   const onChangeCost = useCallback((v) => {
      if (/[^0-9,]/g.test(v) && v.length !== 0) {
         setErrMsg((prev) => ({ ...prev, cost: "숫자만 입력해주세요." }));
      } else {
         setErrMsg((prev) => ({ ...prev, cost: "" }));
         setCost(v);
      }
   }, []);

   // 경유지 추가
   const onCompleteWaypoint = async () => {
      if (title.length === 0) {
         setErrMsg((prev) => ({
            ...prev,
            title: "최소 한글자를 적어주세요.",
         }));
         return;
      }

      //지역은 넣었는지
      if (!region.formatted_address) {
         setErrMsg((prev) => ({
            ...prev,
            region: "상단의 검색 탭에서 해당하는 위치를 검색해주세요.",
         }));
         return;
      }

      // 시작 전, 끝 후인지
      date.setSeconds(0);
      date.setMilliseconds(0);
      let dateTime = date.getTime();
      if (
         dateTime < plans[0].time.getTime() ||
         plans[plans.length - 1].time.getTime() < dateTime
      ) {
         setErrMsg((prev) => ({
            ...prev,
            time: "시작 전이나 끝 이후에 경유지를 넣을 순 없습니다!",
         }));
         return;
      }
      // 겹치는 시간 있는지 확인
      const idx = binarySearch(plans, dateTime);
      if (plans[idx].time.getTime() === dateTime) {
         setErrMsg((prev) => ({
            ...prev,
            time: "이미 같은 시간대의 경유지 블록이 있습니다!",
         }));
         return;
      }

      let obj = {
         id: uuid.v4(), // uuid로
         createdWhere: TRAVEL,
         title: title,
         time: date,
         type: WAYPOINT,
         cost: parseInt(cost.replace(/,/g, "")) || 0,
         memo: memo,
         detailType: detailType,
         location: { latitude: region.latitude, longitude: region.longitude },
      };

      setLoading(true);
      //파이어베이스 추가 + 로딩
      try {
         await addTravelBlock(
            "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
            1627379541738,
            obj
         );
      } catch (err) {
         setLoading(false);
         return;
      }
      //리프레시
      onPressAddCancel();
      setRefresh((prev) => prev + 1);
   };

   // 이동 블록 추가
   const onCompleteTransit = async () => {
      if (title.length === 0) {
         setErrMsg((prev) => ({
            ...prev,
            title: "적어도 한글자를 적어주세요.",
         }));
         return;
      }

      // 둘 중 하나가 이동 -> 이동에 맞춰서
      // 둘 다 경유지 -> 사이로
      const first = plans[selectedIds[0]],
         second = plans[selectedIds[1]];

      let priority = 0;
      if (
         (first.type === WAYPOINT || first.type === START) &&
         second.type === TRANSIT
      ) {
         priority = -2147483648;
      } else if (
         first.type === TRANSIT &&
         (second.type === WAYPOINT || second.type === END)
      ) {
         priority = 2147483647;
      } else if (first.type === TRANSIT && second.type === TRANSIT) {
         priority = (first.priority + second.priority) / 2;
      }

      let obj = {
         id: uuid.v4(), // uuid로
         createdWhere: TRAVEL,
         title: title,
         time: new Date(first.time.getTime()),
         type: TRANSIT,
         detailType: detailType,
         cost: parseInt(cost.replace(/,/g, "")) || 0,
         memo: memo,
         priority: priority,
      };

      setLoading(true);
      //파이어베이스 추가 + 로딩
      try {
         await addTravelBlock(
            "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
            1627379541738,
            obj
         );
      } catch (err) {
         setLoading(false);
         return;
      }
      //리프레시
      onPressAddCancel();
      setRefresh((prev) => prev + 1);
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
            cost={cost}
            memo={memo}
            onChangeMemo={onChangeMemo}
            onChangeCost={onChangeCost}
            errMsg={errMsg}
         />

         {type === WAYPOINT ? (
            <>
               <SelectDate
                  date={date}
                  setDate={setDate}
                  errMsg={errMsg.time}
                  setErrMsg={setErrMsg}
                  start={plans[0].time}
                  end={plans[plans.length - 1].time}
               />
               <SelectLocation region={region} errMsg={errMsg.region} />
            </>
         ) : (
            <View style={styles.line}>
               <Text style={styles.label}>연결시킬 블록을 선택해주세요.</Text>
               <BlockSelect
                  plans={plans}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
               />
            </View>
         )}
         <View style={styles.completeButtonContainer}>
            <Button
               containerStyle={styles.buttonContainer}
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
      marginBottom: 60,
      backgroundColor: theme.color.white,
   },
   label: {
      fontSize: 18,
   },
   completeButtonContainer: {
      width: "100%",
      alignItems: "center",
   },
   buttonContainer: {
      width: 100,
   },
   line: {
      marginBottom: 50,
   },
});

export default AddBlock;
