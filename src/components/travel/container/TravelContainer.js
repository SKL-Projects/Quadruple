import React, { useEffect, useRef, useState } from "react";
import Travel from "../view/Travel";
import { planDatas } from "./PlanDatas";

function TravelContainer() {
   const sheetRef = useRef(null);
   const [plans, setPlans] = useState({});
   const [length, setLength] = useState(5);
   const [markers, setMarkers] = useState([]);
   useEffect(() => {
      const sortedPlans = planDatas.sort((a, b) => {
         return a.time < b.time ? -1 : 1;
      });
      setLength(sortedPlans.length);
      setMarkers(
         sortedPlans.map((item) => ({
            cost: item.cost,
            location: item.location,
         }))
      );
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
         markers={markers}
      />
   );
}

export default TravelContainer;
