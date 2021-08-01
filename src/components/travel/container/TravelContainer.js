import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllTravelList } from "../../../lib/api/travelList";
import Travel from "../view/Travel";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { clearMap, setPlanMap } from "../../../modules/plansMap";

function TravelContainer() {
   const sheetRef = useRef(null); // 바닥 시트 reference
   const [plans, setPlans] = useState({}); // 날짜별로 그룹지어진 블록등
   const [loading, setLoading] = useState(true);
   const [length, setLength] = useState(0); // 전체 블록 개수
   const [region, setRegion] = useState({
      // 현재 보여주는 지역
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
   });
   const [onAddBlock, setOnAddBlock] = useState(false);
   const [refresh, setRefresh] = useState(0);
   //마커 클릭시 스크롤를 위한 refs 배열
   const itemRefs = Array(100)
      .fill(0, 0, 100)
      .map(() => useRef());
   const dispatch = useDispatch();

   useEffect(() => {
      const getTravel = async () => {
         setLoading(true);
         const travel = await getAllTravelList("aT1JPMs3GXg7SrkRE1C6KZPJupu1");

         // timeStamp, geoPoint 데이터 preprocessing
         const datas = travel[0].plans.plans.map((item) => {
            return {
               ...item,
               time: item.time.toDate(),
               location: {
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
               },
            };
         });

         setLength(datas.length);

         // 시간순으로 정렬. transit 은 같은 시간의 뒤로
         let sortedPlans = datas.sort((a, b) => {
            if (a.time.valueOf() === b.time.valueOf()) {
               return a.type === "transit" ? 1 : -1;
            }
            return a.time.valueOf() < b.time.valueOf() ? -1 : 1;
         });

         // 아이디 - 리스트 맵 리덕스에 저장
         const map = new Map();
         for (let i = 0; i < sortedPlans.length; i++) {
            map.set(sortedPlans[i].id, { ...sortedPlans[i], idx: i });
         }
         dispatch(setPlanMap(map));

         // 리전 등록
         setRegion((prev) => ({
            ...prev,
            ...sortedPlans[0].location,
            id: sortedPlans[0].id,
         }));

         // 같은 날짜로 그룹핑
         const groups = sortedPlans.reduce((groups, plan) => {
            const date = `${plan.time.getFullYear()}/${
               plan.time.getMonth() + 1
            }/${plan.time.getDate()}`;
            if (!groups[date]) {
               groups[date] = [];
            }
            groups[date].push(plan);
            return groups;
         }, {});
         setPlans(groups);

         setLoading(false);
      };
      getTravel();

      return () => dispatch(clearMap());
   }, [refresh]);

   const onPressAddBlock = useCallback(() => {
      setOnAddBlock(true);
   }, []);
   const onPressAddCancel = useCallback(() => {
      setOnAddBlock(false);
   }, []);

   return (
      <>
         {loading ? (
            <View
               style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
               }}>
               <LottieView
                  style={{
                     width: 100,
                     height: 100,
                  }}
                  autoPlay
                  source={require("../../../lib/styles/lottie/loading-circle.json")}
               />
            </View>
         ) : (
            <Travel
               sheetRef={sheetRef}
               plans={plans}
               length={length}
               itemRefs={itemRefs}
               region={region}
               setRegion={setRegion}
               onPressAddBlock={onPressAddBlock}
               onAddBlock={onAddBlock}
               onPressAddCancel={onPressAddCancel}
               setRefresh={setRefresh}
            />
         )}
      </>
   );
}

export default TravelContainer;
