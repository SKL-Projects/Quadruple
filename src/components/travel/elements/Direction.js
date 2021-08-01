import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import { googleMapKey } from "../../../../env";
import { TRANSIT } from "../../../lib/types";

const GOOGLE_API_KEY = googleMapKey;

function Direction({ region, markers }) {
   const [loading, setLoading] = useState(true);
   const [last, setLast] = useState(false);
   const [showPoly, setShowPoly] = useState(false);
   const [coords, setCoords] = useState([]);
   const plansMap = useSelector(({ planMap }) => planMap);

   useEffect(() => {
      setLast(false);
      setLoading(true);
      setShowPoly(false);
      const res = plansMap.get(region.id);
      if (typeof res !== "object") return;
      if (res?.idx === plansMap.size - 1) {
         setLast(true);
         return;
      }
      if (res?.type === TRANSIT) {
         setCoords(res.direction);
      } else {
         const next = markers[res.idx + 1];
         const origin = res.location;
         const dest =
            next.type === TRANSIT ? next?.direction[1] : next?.location;
         setCoords([origin, dest]);
      }
      setLoading(false);
   }, [region, plansMap, markers]);

   return (
      <>
         {!last || !loading ? (
            showPoly ? (
               <Polyline
                  coordinates={
                     coords[0].latitude
                        ? coords
                        : [
                             {
                                latitude: 0,
                                longitude: 0,
                             },
                             {
                                latitude: 0,
                                longitude: 0,
                             },
                          ]
                  }
                  lineDashPattern={[1]}
                  strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeWidth={5}
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
