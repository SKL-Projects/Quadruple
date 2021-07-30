import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import Cost from "../view/Cost";
import { View,LogBox } from "react-native";
import { getAllTravelList } from "../../../lib/api/travelList";

function CostContainer({ navigation }) {

   const [plans, setPlans] = useState({}); // 날짜별로 그룹지어진 블록등
   const [loading, setLoading] = useState(true);
   const [length, setLength] = useState(0); // 전체 블록 개수
   const [markers, setMarkers] = useState([]); // 마커들
   const [region, setRegion] = useState({
      // 현재 보여주는 지역
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
   });
   LogBox.ignoreLogs(['Setting a timer']);
   const getTravel = async () => {
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

      let sortedPlans = datas.sort((a, b) => {
         if (a.time.valueOf() === b.time.valueOf()) {
            return a.type === "transit" ? 1 : -1;
         }
         return a.time.valueOf() < b.time.valueOf() ? -1 : 1;
      });

      setMarkers(
         sortedPlans.map((item) => ({
            id: item.id,
            cost: item?.cost,
            location: item.location,
            type: item.type,
         }))
      );
      setRegion((prev) => ({
         ...prev,
         ...sortedPlans[0].location,
         id: sortedPlans[0].id,
      }));

      setPlans(sortedPlans);
      setLoading(false);
   };

   useEffect(() => {
      getTravel();
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
            <Cost 
               navigation={navigation} 
               plans={plans}
               length={length}
               markers={markers}
               region={region}
               setRegion={setRegion}
            />
         )}
      </>
   );
}

export default CostContainer;
