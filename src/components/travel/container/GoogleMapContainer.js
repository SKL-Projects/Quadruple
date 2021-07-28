import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import GoogleMap from "../view/GoogleMap";
import { Animated } from "react-native";

function GoogleMapContainer({
   markersInput,
   regionInput,
   setRegion,
   itemRefs,
}) {
   const [markers, setMarkers] = useState([]);
   const [thisRegion, setThisRegion] = useState(regionInput);
   const mapViewRef = useRef();

   let mapAnimation = new Animated.Value(0);

   useEffect(() => {
      setMarkers(markersInput);
   }, [markersInput]);

   useEffect(() => {
      mapViewRef.current?.animateToRegion(regionInput, 900);
      for (let i = 0; i < markers.length; i++) {
         if (regionInput.id === markers[i].id) {
            mapAnimation.setValue(i);
            break;
         }
      }
   }, [regionInput, markers]);

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
      (index) => {
         itemRefs[index].current?.scrollIntoView({ align: "top" });

         setRegion((prev) => ({
            ...prev,
            ...markers[index].location,
            id: markers[index].id,
         }));
      },
      [itemRefs, markers]
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
