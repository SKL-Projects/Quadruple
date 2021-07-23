import React, { useEffect, useState } from "react";
import GoogleMap from "../view/GoogleMap";
import * as Location from "expo-location";
import { markersData } from "../view/mapData";
import { Animated } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

function sleep(ms) {
   //sleep 함수
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function GoogleMapContainer({ markersInput }) {
   const [region, setRegion] = useState("");
   const [markers, setMarkers] = useState([]);
   const [loading, setLoading] = useState(true);
   const mapViewRef = React.createRef();
   let mapIndex = 0;
   let mapAnimation = new Animated.Value(0);

   useEffect(() => {
      setMarkers(markersInput);
      if (markersInput[0]) {
         setLoading(false);
         setRegion({
            ...markersInput[0].location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
         });
      } else {
         setRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
         });
      }
   }, [markersInput]);

   const interpolations = markers.map((marker, index) => {
      const inputRange = [
         (index - 1) * CARD_WIDTH,
         index * CARD_WIDTH,
         (index + 1) * CARD_WIDTH,
      ];

      const scale = mapAnimation.interpolate({
         inputRange,
         outputRange: [1, 1.5, 1],
         extrapolate: "clamp",
      });

      return { scale };
   });

   return (
      <GoogleMap
         setRegion={setRegion}
         loading={loading}
         region={region}
         mapViewRef={mapViewRef}
         interpolations={interpolations}
         mapAnimation={mapAnimation}
         markers={markers}
      />
   );
}

export default GoogleMapContainer;
