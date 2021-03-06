import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import AutoCompleteContainer from "../container/AutoCompleteContainer";
import Markers from "../elements/Markers";
import Direction from "../elements/Direction";

export default function GoogleMap({
   setRegion,
   region,
   regionInput,
   mapViewRef,
   interpolations,
   markers,
   onPressMarker,
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
            <Markers
               markers={markers}
               interpolations={interpolations}
               onPressMarker={onPressMarker}
            />
            <Direction region={regionInput} markers={markers} />
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
});
