import React, { useCallback, useEffect, useRef, useState } from "react";
import Travel from "../view/Travel";
import LottieView from "lottie-react-native";
import { Keyboard, View } from "react-native";
import EditModalContainer from "./EditModalContainer";
import { END, TRANSIT, WAYPOINT } from "../../../lib/types";
import {
   changeSequence,
   getPlans,
   removeTravelBlock,
} from "../../../lib/api/travelBlock";

function TravelContainer({ route }) {
   const sheetRef = useRef(null); // 바닥 시트 reference
   const [original, setOriginal] = useState([]);
   const [plans, setPlans] = useState([]); // 정렬된 블록들
   const [loading, setLoading] = useState(true);
   const [region, setRegion] = useState({
      // 현재 보여주는 지역
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
   });
   const [onAddBlock, setOnAddBlock] = useState(false); // 블록 추가 화면인지
   const [refresh, setRefresh] = useState(0); // 블록 다시 받아오기
   const [visibleEditModal, setVisibleEditModal] = useState(false); // 수정 모달 띄우기
   const [editElement, setEditElement] = useState({}); // 수정하는 아이템 객체

   // 키보드 켰을땐 중간 사이즈로 자동조정
   useEffect(() => {
      const keyboardShowCallback = () => {
         sheetRef.current?.snapTo(1);
      };
      Keyboard.addListener("keyboardDidShow", keyboardShowCallback);
      return () => {
         Keyboard.removeAllListeners("keyboardDidShow");
      };
   }, []);

   useEffect(() => {
      if (route?.params) {
         setRegion({ ...route.params });
         setOnAddBlock(true);
      }
   }, [route.params]);

   useEffect(() => {
      const getTravel = async () => {
         setLoading(true);
         let res;
         try {
            res = await getPlans("aT1JPMs3GXg7SrkRE1C6KZPJupu1", 1627379541738);
         } catch (err) {
            setLoading(false);
            return;
         }
         // timeStamp, geoPoint 데이터 preprocessing
         const processedDatas = res.plans.map((item) => {
            const todate = item.time.toDate();
            item.time = todate;
            return item;
         });

         // 시간순으로 정렬. transit 은 같은 시간의 뒤로
         const sortedPlans = processedDatas.sort((a, b) => {
            if (a.time.valueOf() === b.time.valueOf()) {
               if (a.type === TRANSIT && b.type === TRANSIT) {
                  return a.priority < b.priority ? -1 : 1;
               }
               return a.type === TRANSIT ? 1 : -1;
            }
            return a.time.valueOf() < b.time.valueOf() ? -1 : 1;
         });

         setOriginal([...sortedPlans]);

         let bridgePlans = sortedPlans.map((item) => {
            return {
               ...item,
               date: `${item.time.getFullYear()}/${
                  item.time.getMonth() + 1
               }/${item.time.getDate()}`,
               location: {
                  latitude: item.location?.latitude,
                  longitude: item.location?.longitude,
               },
            };
         });

         // 이동블록 location, direction 생성
         let transitIdx = -1,
            startPoint;
         bridgePlans.forEach((item, idx) => {
            if (transitIdx === -1) {
               if (item.type === TRANSIT) {
                  transitIdx = idx;
               } else {
                  startPoint = item.location;
               }
            } else if (item.type === WAYPOINT || item.type === END) {
               let location = {
                  latitude: (startPoint.latitude + item.location.latitude) / 2,
                  longitude:
                     (startPoint.longitude + item.location.longitude) / 2,
               };
               for (let i = transitIdx; i < idx; i++) {
                  bridgePlans[i].location = location;
                  bridgePlans[i].direction = [startPoint, item.location];
               }
               startPoint = item.location;
               transitIdx = -1;
            }
         });

         setPlans(bridgePlans);

         // 리전 등록
         setRegion((prev) => ({
            ...prev,
            ...bridgePlans[0].location,
            id: bridgePlans[0].id,
            idx: 0,
         }));

         setLoading(false);
      };
      getTravel();
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

   // 순서변경 드래그.
   // 순서 변경시 다시 블록을 불러들이도록 함.
   // 이떄 경유지 블록 - 이동블록은 안되고, 서로 date와 priority만 바꾼다.
   // 두개의 타입이 같아야하기에, 출발-도착 블록도 어떠한 블록과 교환 불가능하다
   const onDragEnd = useCallback(
      async ({ data, from, to }) => {
         if (original[from].type === original[to].type && from !== to) {
            setLoading(true);
            let originalData = [...original];

            originalData[from] = {
               ...originalData[from],
               time: original[to].time,
               priority: original[to].priority || 0,
            };
            originalData[to] = {
               ...originalData[to],
               time: original[from].time,
               priority: original[from].priority || 0,
            };

            //date, location,
            try {
               await changeSequence(
                  "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
                  1627379541738,
                  originalData
               );
            } catch (err) {
               setLoading(false);
               return;
            }
            setRefresh((prev) => prev + 1);
         }
      },
      [original]
   );

   // 블록 삭제
   const onRemoveBlock = useCallback(
      async (id, index) => {
         if (original[index].id === id) {
            setLoading(true);
            try {
               await removeTravelBlock(
                  "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
                  1627379541738,
                  original[index]
               );
            } catch (err) {
               setLoading(false);
               return;
            }
            setRefresh((prev) => prev + 1);
         }
      },
      [original]
   );

   // 블록 클릭시, region을 누른 블록으로 지정함.
   // 단, 이동블록일 경우 delta를 경로가 최대한 다 보이도록 설정함.
   const onPressListItem = useCallback((location, id, index, direction) => {
      let deltas = {
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
      };
      if (direction) {
         deltas["latitudeDelta"] =
            Math.abs(direction[0]?.latitude - direction[1]?.latitude) * 2;
         deltas["longitudeDelta"] =
            Math.abs(direction[0]?.longitude - direction[1]?.longitude) * 2;
      }
      setRegion({
         ...deltas,
         ...location,
         id: id,
         idx: index,
      });
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
                  region={region}
                  setRegion={setRegion}
                  onPressAddBlock={onPressAddBlock}
                  onAddBlock={onAddBlock}
                  onPressAddCancel={onPressAddCancel}
                  setRefresh={setRefresh}
                  openEditModal={openEditModal}
                  onDragEnd={onDragEnd}
                  onRemoveBlock={onRemoveBlock}
                  onPressListItem={onPressListItem}
                  setLoading={setLoading}
               />
               {visibleEditModal && (
                  <EditModalContainer
                     setLoading={setLoading}
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
