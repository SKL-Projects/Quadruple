import React from "react";
import { Animated } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";

function Markers({ markers, interpolations }) {
   return (
      <>
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
                  key={`marker_${index}`}
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
      </>
   );
}

const styles = StyleSheet.create({
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
   price: {
      backgroundColor: "#ffffff",
      borderRadius: 10,
   },
});

export default Markers;
