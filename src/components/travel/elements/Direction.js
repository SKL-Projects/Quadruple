import React, { useEffect, useState } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { googleMapKey } from "../../../../env";
import { TRANSIT } from "../../../lib/types";

const GOOGLE_API_KEY = googleMapKey;

function Direction({ region, markers }) {
   const [loading, setLoading] = useState(true);
   const [last, setLast] = useState(false);
   const [showPoly, setShowPoly] = useState(false);
   const [coords, setCoords] = useState([]);

   useEffect(() => {
      setLast(false);
      setLoading(true);
      setShowPoly(false);
      if (region.idx !== undefined) {
         // 마지막
         if (region.idx === markers.length - 1) {
            setLast(true);
            return;
         }
         // 경로일때, 마커에 이미 있는 direction을 그냥 집어넣음.
         if (markers[region.idx].type === TRANSIT) {
            setCoords(markers[region.idx].direction);
         } else {
            const next = markers[region.idx + 1];
            const origin = markers[region.idx].location;

            //다음이 transit이면, 이동블록마커에 저장되어있는 direction을 이용하여 경로 표시
            const dest =
               next.type === TRANSIT ? next.direction[1] : next.location;
            setCoords([origin, dest]);
         }
      }
      setLoading(false);
   }, [region, markers]);

   // 마지막이거나 로딩중이면 안보이게 함
   // 경로를 찾을 수 없을때는 일직선으로 긋게함.
   return (
      <>
         {!last || !loading ? (
            showPoly ? (
               <Polyline
                  coordinates={[
                     {
                        latitude: coords[0].latitude,
                        longitude: coords[0].longitude,
                     },
                     {
                        latitude: coords[1].latitude,
                        longitude: coords[1].longitude,
                     },
                  ]}
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

export default Direction;
