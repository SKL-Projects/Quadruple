import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { googleMapKey } from "../../../../env";

const GOOGLE_API_KEY = googleMapKey;

function Direction({ markers, region }) {
   const [loading, setLoading] = useState(true);
   const [showPoly, setShowPoly] = useState(false);
   const [coords, setCoords] = useState([{}, {}]);
   useEffect(() => {
      setLoading(true);
      setShowPoly(false);
      for (let i = 0; i < markers.length - 1; i++) {
         if (region.id === markers[i].id) {
            const origin =
               markers[i].type !== "transit"
                  ? markers[i].location
                  : markers[i - 1].location;
            const destination =
               markers[i + 1].type === "transit"
                  ? markers[i + 2].location
                  : markers[i + 1]?.location;
            setCoords([origin, destination]);
         }
      }
      setLoading(false);
   }, [region]);

   return (
      <>
         {!loading ? (
            showPoly ? (
               <Polyline
                  coordinates={coords}
                  lineDashPattern={[1]}
                  strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeWidth={6}
               />
            ) : (
               <MapViewDirections
                  lineDashPattern={[1]}
                  origin={coords[0]}
                  destination={coords[1]}
                  apikey={GOOGLE_API_KEY} // insert your API Key here
                  strokeWidth={5}
                  language="ko"
                  strokeColor="red"
                  precision="high"
                  mode="TRANSIT"
                  onError={(errorMessage) => {
                     if (errorMessage.endsWith("ZERO_RESULTS")) {
                        setShowPoly(true);
                     }
                  }}
               />
            )
         ) : (
            <></>
         )}
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default Direction;
