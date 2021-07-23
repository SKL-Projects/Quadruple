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

function GoogleMapContainer() {
   const [isLoading, setIsLoading] = useState(true);
   const [region, setRegion] = useState("");
   const [markers, setMarkers] = useState([]);
   const mapViewRef = React.createRef();

   let mapIndex = 0;
   let mapAnimation = new Animated.Value(0);

   const getLocation = async () => {
      //위치 가져오기
      try {
         await Location.requestForegroundPermissionsAsync(); //퍼미션 받고
         const { coords } = await Location.getCurrentPositionAsync(); //내위치 가져와서 coords에
         setRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
         });

         setIsLoading(false);
      } catch (error) {
         alert("Can't find you.", "So sad");
         console.log(error);
      }
   };

   useEffect(() => {
      if (isLoading) getLocation();
      setMarkers(markersData);
   }, []);

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
         isLoading={isLoading}
         setRegion={setRegion}
         region={region}
         mapViewRef={mapViewRef}
         interpolations={interpolations}
         mapAnimation={mapAnimation}
         markers={markers}
      />
   );
}

export default GoogleMapContainer;
