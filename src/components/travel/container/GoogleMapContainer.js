import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import GoogleMap from "../view/GoogleMap";
import { Animated } from "react-native";
import { useSelector } from "react-redux";

function GoogleMapContainer({ regionInput, setRegion, listRef }) {
   const [markers, setMarkers] = useState([]);
   const [thisRegion, setThisRegion] = useState(regionInput);
   const mapViewRef = useRef();
   const plansMap = useSelector(({ planMap }) => planMap);

   let mapAnimation = new Animated.Value(0);

   useEffect(() => {
      let array = [];
      plansMap.forEach((item) =>
         array.push({
            id: item.id,
            location: item.location,
            type: item.type,
            cost: item.cost,
            direction: item.direction,
         })
      );
      setMarkers(array);
   }, [plansMap]);

   useEffect(() => {
      mapViewRef.current?.animateToRegion(regionInput, 900);
      const res = plansMap.get(regionInput.id);
      if (typeof res === "object") {
         mapAnimation.setValue(res?.idx);
      }
   }, [regionInput, plansMap]);

   const interpolations = markers.map((marker, index) => {
      const inputRange = [index - 1, index, index + 1];

      const scale = mapAnimation.interpolate({
         inputRange: inputRange,
         outputRange: [1, 1.5, 1],
         extrapolate: "clamp",
      });

      return { scale };
   });

   const onPressMarker = useCallback(
      (id) => {
         const { idx, sIdx } = plansMap.get(id);
         listRef.current?.scrollToLocation({
            itemIndex: idx,
            sectionIndex: sIdx,
         });

         setRegion((prev) => ({
            ...prev,
            ...markers[idx].location,
            id: markers[idx].id,
         }));
      },
      [markers, plansMap]
   );

   const onAnimateRegion = () => {
      setThisRegion(regionInput);
   };

   return (
      <GoogleMap
         regionInput={regionInput}
         setRegion={setRegion}
         region={thisRegion}
         mapViewRef={mapViewRef}
         interpolations={interpolations}
         mapAnimation={mapAnimation}
         markers={markers}
         onPressMarker={onPressMarker}
         onAnimateRegion={onAnimateRegion}
      />
   );
}

export default React.memo(GoogleMapContainer);
