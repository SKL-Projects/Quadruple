import React, { useCallback, useEffect, useRef, useState } from "react";
import GoogleMap from "../view/GoogleMap";
import { Animated } from "react-native";

function GoogleMapContainer({ regionInput, setRegion, listRef, plans }) {
   const [markers, setMarkers] = useState([]);
   const [thisRegion, setThisRegion] = useState(regionInput);
   const mapViewRef = useRef();

   let mapAnimation = new Animated.Value(0);

   useEffect(() => {
      let array = [];
      plans.forEach((item) =>
         array.push({
            id: item.id,
            location: item.location,
            type: item.type,
            cost: item.cost,
            direction: item.direction,
         })
      );
      setMarkers(array);
   }, [plans]);

   useEffect(() => {
      mapViewRef.current?.animateToRegion(regionInput, 900);
      if (regionInput.idx) {
         mapAnimation.setValue(regionInput.idx);
      }
   }, [regionInput]);

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
      (idx) => {
         listRef.current?.scrollToIndex({
            index: idx,
         });

         setRegion((prev) => ({
            ...prev,
            ...markers[idx].location,
            id: markers[idx].id,
         }));
      },
      [markers]
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
