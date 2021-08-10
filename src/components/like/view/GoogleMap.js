import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import AutoCompleteContainer from "../container/AutoCompleteContainer";
import { Image } from "react-native";

export default function GoogleMap({
   setRegion,
   region,
   mapViewRef,
   onAnimateRegion,
}) {
   return (
      <View style={styles.container}>
         <AutoCompleteContainer setRegion={setRegion} />
         <MapView
            provider={PROVIDER_GOOGLE}
            region={region}
            ref={mapViewRef}
            key="Gmap"
            style={styles.map}
            onRegionChangeComplete={onAnimateRegion}>
            {region && (
               <Marker coordinate={region}>
                  <View style={[styles.markerWrap]}>
                     <Image
                        source={require("../../../../assets/map_marker.png")}
                        style={[styles.marker]}
                        resizeMode="cover"
                     />
                  </View>
               </Marker>
            )}
         </MapView>
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
   map: {
      width: Dimensions.get("window").width,
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
   },
   marker: {
      width: 45,
      height: 45,
   },
});
