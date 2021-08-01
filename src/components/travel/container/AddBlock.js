import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import theme from "../../../lib/styles/theme";
import { TRANSIT, WAYPOINT } from "../../../lib/types";
import BlockInfoInput from "../elements/BlockInfoInput";
import BlockSelect from "../elements/BlockSelect";
import SelectDate from "../elements/SelectDate";
import SelectLocation from "../elements/SelectLocation";
import uuid from "react-native-uuid";
import { addTravelBlock } from "../../../lib/api/travelBlock";

// 메모, 예산 안함

function AddBlock({ plans, region, setRegion, onPressAddCancel, setRefresh }) {
   const [title, setTitle] = useState("");
   const [date, setDate] = useState(new Date());
   const [type, setType] = useState(WAYPOINT);
   const [detailType, setDetailType] = useState(0);
   const [cost, setCost] = useState("0");
   const [memo, setMemo] = useState("");
   const [flatPlans, setFlatPlans] = useState([]);
   const [selectedIds, setSelectedIds] = useState([]);
   const [errMsg, setErrMsg] = useState({ title: "", time: "" });
   const plansMap = useSelector(({ planMap }) => planMap);

   useEffect(() => {
      const reg = region;
      let array = [];
      plansMap.forEach((item) => array.push(item));
      setFlatPlans(array);
      return () => setRegion(reg);
   }, [plansMap]);

   const label = useCallback(
      (content) => <Text style={styles.label}>{content}</Text>,
      []
   );
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

   // 끝 다음, 시작 전에 못넣게 막기
   const onCompleteWaypoint = async () => {
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
      let check = false,
         dateTime = date.getTime();
      if (
         dateTime < flatPlans[0].time.getTime() ||
         flatPlans[flatPlans.length - 1].time.getTime() < dateTime
      ) {
         setErrMsg((prev) => ({
            ...prev,
            time: "시작 전이나 끝 이후에 경유지를 넣을 순 없습니다!",
         }));
         return;
      }
      flatPlans.forEach((item) => {
         if (item.time.getTime() === dateTime) {
            setErrMsg((prev) => ({
               ...prev,
               time: "이미 같은 시간대의 경유지 블록이 있습니다!",
            }));
            check = true;
            return;
         }
      });
      if (check) return;

      let obj = {
         id: uuid.v4(), // uuid로
         createdWhere: "travel",
         title: title,
         time: date,
         type: WAYPOINT,
         cost: parseInt(cost.replace(/,/g, "")),
         memo: memo,
         detailType: detailType,
         location: { latitude: region.latitude, longitude: region.longitude },
      };
      //파이어베이스 추가 + 로딩
      await addTravelBlock(
         "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
         "1627379541738",
         obj
      );
      //리프레시
      setRefresh((prev) => prev + 1);
      onPressAddCancel();
   };

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
      const first = plansMap.get(selectedIds[0]).idx,
         second = plansMap.get(selectedIds[1]).idx;
      const transit =
         flatPlans[first].type !== TRANSIT
            ? flatPlans[second].type !== TRANSIT
               ? null
               : second
            : first;
      let obj = {
         id: uuid.v4(), // uuid로
         createdWhere: "travel",
         title: title,
         time: new Date(
            (flatPlans[first].time.getTime() +
               flatPlans[second].time.getTime()) /
               2
         ),
         type: TRANSIT,
         detailType: detailType,
         cost: parseInt(cost.replace(/,/g, "")),
         memo: memo,
         location: transit
            ? flatPlans[transit].location
            : {
                 latitude:
                    (flatPlans[first].location.latitude +
                       flatPlans[second].location.latitude) /
                    2,
                 longitude:
                    (flatPlans[first].location.longitude +
                       flatPlans[second].location.longitude) /
                    2,
              },
         direction: transit
            ? flatPlans[transit].direction
            : [flatPlans[first].location, flatPlans[second].location],
      };
      //파이어베이스 추가 + 로딩
      await addTravelBlock("aT1JPMs3GXg7SrkRE1C6KZPJupu1", 1627379541738, obj);
      //리프레시
      setRefresh((prev) => prev + 1);
      onPressAddCancel();
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
