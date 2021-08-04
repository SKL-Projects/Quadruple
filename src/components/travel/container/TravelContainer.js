import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllTravelList } from "../../../lib/api/travelList";
import Travel from "../view/Travel";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { clearMap, setPlanMap } from "../../../modules/plansMap";
import EditModalContainer from "./EditModalContainer";
import { TRANSIT, WAYPOINT } from "../../../lib/types";

function TravelContainer() {
   const sheetRef = useRef(null); // 바닥 시트 reference
   const [plans, setPlans] = useState([]); // 날짜별로 그룹지어진 블록등
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
   const [visibleEditModal, setVisibleEditModal] = useState(false);
   const [editElement, setEditElement] = useState({});

   const dispatch = useDispatch();

   useEffect(() => {
      const getTravel = async () => {
         setLoading(true);
         const travel = await getAllTravelList("aT1JPMs3GXg7SrkRE1C6KZPJupu1");

         // timeStamp, geoPoint 데이터 preprocessing
         const datas = travel[0].plans.plans.map((item) => {
            const todate = item.time.toDate();
            return {
               ...item,
               time: todate,
               date: `${todate.getFullYear()}/${
                  todate.getMonth() + 1
               }/${todate.getDate()}`,
               location: {
                  latitude: item.location?.latitude,
                  longitude: item.location?.longitude,
               },
            };
         });

         setLength(datas.length);

         // 시간순으로 정렬. transit 은 같은 시간의 뒤로
         let sortedPlans = datas.sort((a, b) => {
            if (a.time.valueOf() === b.time.valueOf()) {
               if (a.type === TRANSIT && b.type === TRANSIT) {
                  return a.priority < b.priority ? -1 : 1;
               }
               return a.type === "transit" ? 1 : -1;
            }
            return a.time.valueOf() < b.time.valueOf() ? -1 : 1;
         });

         // transit 위치, 경로
         let transitIdx = -1,
            startPoint;
         sortedPlans.forEach((item, idx) => {
            if (transitIdx === -1) {
               if (item.type === TRANSIT) {
                  transitIdx = idx;
               } else {
                  startPoint = item.location;
               }
            } else if (item.type === WAYPOINT) {
               let location = {
                  latitude: (startPoint.latitude + item.location.latitude) / 2,
                  longitude:
                     (startPoint.longitude + item.location.longitude) / 2,
               };
               for (let i = transitIdx; i < idx; i++) {
                  sortedPlans[i].location = location;
                  sortedPlans[i].direction = [startPoint, item.location];
               }
               transitIdx = -1;
            }
         });

         setPlans(sortedPlans);

         // 아이디 - 리스트 맵 리덕스에 저장
         const map = new Map();
         let cnt = 0;
         sortedPlans.forEach((item) => {
            map.set(item.id, { ...item, idx: cnt });
            cnt++;
         });
         dispatch(setPlanMap(map));

         // 리전 등록
         setRegion((prev) => ({
            ...prev,
            ...sortedPlans[0].location,
            id: sortedPlans[0].id,
         }));

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
   const openEditModal = useCallback((element) => {
      setVisibleEditModal(true);
      setEditElement(element);
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
            <>
               <Travel
                  sheetRef={sheetRef}
                  plans={plans}
                  length={length}
                  region={region}
                  setRegion={setRegion}
                  onPressAddBlock={onPressAddBlock}
                  onAddBlock={onAddBlock}
                  onPressAddCancel={onPressAddCancel}
                  setRefresh={setRefresh}
                  openEditModal={openEditModal}
               />
               {visibleEditModal && (
                  <EditModalContainer
                     visible={visibleEditModal}
                     setVisible={setVisibleEditModal}
                     editElement={editElement}
                     setRefresh={setRefresh}
                  />
               )}
            </>
         )}
      </>
   );
}

export default TravelContainer;
