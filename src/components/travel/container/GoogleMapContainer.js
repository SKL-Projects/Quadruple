import React, { useCallback, useEffect, useRef, useState } from "react";
import GoogleMap from "../view/GoogleMap";
import { Animated } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

function sleep(ms) {
   //sleep 함수
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function GoogleMapContainer({ markersInput, region, setRegion, itemRefs }) {
   const [markers, setMarkers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [thisRegion, setThisRegion] = useState(region);
   const mapViewRef = useRef();

   let mapAnimation = new Animated.Value(0);

   useEffect(() => {
      setMarkers(markersInput);
      if (markersInput[0]) {
         setLoading(false);
      }
   }, [markersInput]);

   useEffect(() => {
      mapViewRef.current?.animateToRegion(region, 900);
      let count = 0;
      for (let i of markers) {
         if (
            region.latitude === i.location.latitude &&
            region.longitude === i.location.longitude
         ) {
            mapAnimation.setValue(count);
            break;
         }
         count++;
      }
   }, [region]);

   const interpolations = markers.map((marker, index) => {
      const inputRange = [index - 1, index, index + 1];

      const scale = mapAnimation.interpolate({
         inputRange: inputRange,
         outputRange: [1, 1.5, 1],
         extrapolate: "clamp",
      });

      return { scale };
   });

   const onPressMarker = (index) => {
      itemRefs[index].current?.scrollIntoView({ align: "top" });
      setRegion((prev) => ({ ...prev, ...markers[index].location }));
   };
   const onAnimateRegion = () => {
      setThisRegion(region);
   };

   return (
      <GoogleMap
         setRegion={setRegion}
         loading={loading}
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
