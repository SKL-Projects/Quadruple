import React, { useCallback, useEffect, useRef, useState } from "react";
import GoogleMap from "../view/GoogleMap";
import { Animated } from "react-native";

function GoogleMapContainer({ regionInput, setRegion, listRef, plans }) {
   const [markers, setMarkers] = useState([]);
   // 전체적인 region과 맵상에서의 region을 분리해서 관리해야 이상한 동작을 막을 수 있음.
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

   // 마커 크기변환을 위한 애니메이션 interpolation.
   // 해당 블록을 선택했을때, 1.5가 적용되어 다른 마커보다 1.5배 커진 마커가 됨.
   const interpolations = markers.map((marker, index) => {
      const inputRange = [index - 1, index, index + 1];

      const scale = mapAnimation.interpolate({
         inputRange: inputRange,
         outputRange: [1, 1.5, 1],
         extrapolate: "clamp",
      });

      return { scale };
   });

   // 마커 눌렀을때, 해당하는 블록으로 바텀시트가 자동스크롤되고, 그쪽으로 이동함.
   const onPressMarker = useCallback(
      (idx) => {
         listRef.current?.current?.scrollToIndex({
            index: idx,
         });

         let deltas = {
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
         };
         setRegion({
            ...deltas,
            ...markers[idx].location,
            id: markers[idx].id,
            idx: idx,
         });
      },
      [markers]
   );

   // 애니메이션 완료됐을때, 여기서 관리하는 region set
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
