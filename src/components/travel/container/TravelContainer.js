import React, { useEffect, useRef, useState } from "react";
import Travel from "../view/Travel";
import { planDatas } from "./PlanDatas";

function TravelContainer() {
   const sheetRef = useRef(null);
   const [plans, setPlans] = useState({});
   const [length, setLength] = useState(0);
   const [markers, setMarkers] = useState([]);
   const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
   });
   //마커 클릭시 스크롤를 위한 refs 배열
   const itemRefs = Array(100)
      .fill(0, 0, 100)
      .map(() => useRef());

   useEffect(() => {
      setLength(planDatas.length);
      const sortedPlans = planDatas.sort((a, b) => {
         if (a.time === b.time) {
            return a.type === "transit" ? 1 : -1;
         }
         return a.time < b.time ? -1 : 1;
      });
      setMarkers(
         sortedPlans.map((item) => ({
            id: item.id,
            cost: item.cost,
            location: item.location,
            type: item.type,
         }))
      );
      setRegion((prev) => ({
         ...prev,
         ...sortedPlans[0].location,
         id: sortedPlans[0].id,
      }));
      const groups = sortedPlans.reduce((groups, plan) => {
         const date = `${plan.time.getFullYear()}/${plan.time.getMonth()}/${plan.time.getDate()}`;
         if (!groups[date]) {
            groups[date] = [];
         }
         groups[date].push(plan);
         return groups;
      }, {});
      setPlans(groups);
   }, []);

   return (
      <Travel
         sheetRef={sheetRef}
         plans={plans}
         length={length}
         itemRefs={itemRefs}
         markers={markers}
         region={region}
         setRegion={setRegion}
      />
   );
}

export default TravelContainer;
