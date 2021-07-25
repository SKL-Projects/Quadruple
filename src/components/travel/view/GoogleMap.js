import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { googleMapKey } from "../../../../env";
import AutoCompleteContainer from "../container/AutoCompleteContainer";
import Markers from "../elements/Markers";

const GOOGLE_API_KEY = googleMapKey;

export default function GoogleMap({
   setRegion,
   region,
   mapViewRef,
   interpolations,
   markers,
   loading,
   onPressMarker,
   onAnimateRegion,
}) {
   const [x, setX] = useState(5);

   return (
      <View style={styles.container}>
         {loading ? (
            <View style={styles.content}>
               <Text>Loading...</Text>
            </View>
         ) : (
            <>
               <AutoCompleteContainer setRegion={setRegion} />
               <MapView
                  provider={PROVIDER_GOOGLE}
                  region={region}
                  ref={mapViewRef}
                  key="Gmap"
                  style={styles.map}
                  onRegionChangeComplete={onAnimateRegion}>
                  <Markers
                     markers={markers}
                     interpolations={interpolations}
                     onPressMarker={onPressMarker}
                  />
               </MapView>
            </>
         )}
      </View>
   );
}
/*
<MapViewDirections
                     lineDashPattern={[1]}
                     origin={markers[x]?.startPoint ? markers[x].startPoint : 0}
                     destination={
                        markers[x]?.endPoint ? markers[x].endPoint : 0
                     }
                     apikey={GOOGLE_API_KEY} // insert your API Key here
                     strokeWidth={5}
                     strokeColor="#20B2AA"
                     mode="TRANSIT"
                     onReady={(result) => {
                        console.log(`Distance: ${result.distance} km`);
                        console.log(`Duration: ${result.duration} min.`);
                     }}
                     onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                     }}
                  /> */

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      position: "absolute",
      flex: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   map: {
      width: Dimensions.get("window").width,
      height: "100%",
      zIndex: 1,
   },

   price: {
      backgroundColor: "#ffffff",
      borderRadius: 10,
   },
   line: {
      borderRadius: 10,
   },
   markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
   },
   marker: {
      width: 30,
      height: 30,
   },
});
