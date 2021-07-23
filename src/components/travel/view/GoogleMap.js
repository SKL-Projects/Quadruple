import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import AutoComplete from "./AutoComplete";
import MapViewDirections from "react-native-maps-directions";
import { googleMapKey } from "../../../../env";

const GOOGLE_API_KEY = googleMapKey;

export default function GoogleMap({
   setRegion,
   region,
   mapViewRef,
   interpolations,
   markers,
   loading,
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
               <View style={{ position: "absolute", top: 20, width: "90%" }}>
                  <AutoComplete setRegion={setRegion} />
               </View>
               <MapView
                  provider={PROVIDER_GOOGLE}
                  region={region}
                  ref={mapViewRef}
                  key="Gmap"
                  style={styles.map}>
                  {markers.map((marker, index) => {
                     const scaleStyle = {
                        transform: [
                           {
                              scale: interpolations[index].scale,
                           },
                        ],
                     };
                     return (
                        <MapView.Marker
                           key={index}
                           coordinate={marker.location}>
                           <>
                              <Animated.View style={[styles.markerWrap]}>
                                 <Animated.Image
                                    source={require("../../../../assets/map_marker.png")}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                 />
                              </Animated.View>
                              <View style={styles.price}>
                                 <Text>&nbsp;&#8361;{marker.cost}&nbsp;</Text>
                              </View>
                           </>
                        </MapView.Marker>
                     );
                  })}

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
                  />
               </MapView>
            </>
         )}
      </View>
   );
}

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
