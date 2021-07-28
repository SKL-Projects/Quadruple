import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import Cost from "../view/Cost";
import { View } from "react-native";
import { getAllTravelList } from "../../../lib/api/travelList";

function CostContainer({ navigation }) {

   const [loading, setLoading] = useState(true);

   useEffect(() => {
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
         
         let sortedPlans = datas.sort((a, b) => {
            if (a.time.valueOf() === b.time.valueOf()) {
               return a.type === "transit" ? 1 : -1;
            }
            return a.time.valueOf() < b.time.valueOf() ? -1 : 1;
         });

         sortedPlans.map(x => {
            console.log(x)
         })
         setLoading(false);
      }
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
            <Cost navigation={navigation} />
         )}
      </>
   );
}

export default CostContainer;
