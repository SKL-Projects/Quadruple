import React, { useEffect, useState } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { googleMapKey } from "../../../../env";
import { TRANSIT } from "../../../lib/types";

const GOOGLE_API_KEY = googleMapKey;

function Direction({ points }) {

   const [showPoly, setShowPoly] = useState(false);
   const [coords, setCoords] = useState([]);

   useEffect(() => {      
      
      setShowPoly(false);
      
   }, []);

   // 마지막이거나 로딩중이면 안보이게 함
   // 경로를 찾을 수 없을때는 일직선으로 긋게함.
   return (
      <>
         {showPoly ? (
               <Polyline
                  coordinates={[
                     {
                        latitude: points.startPoint.latitude,
                        longitude: points.startPoint.longitude,
                     },
                     {
                        latitude: points.endPoint.latitude,
                        longitude: points.endPoint.longitude,
                     },
                  ]}
                  lineDashPattern={[1]}
                  strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeWidth={5}
               />
            ) : (
               <MapViewDirections
                  lineDashPattern={[1]}
                  origin={points.startPoint}
                  destination={points.endPoint}
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
            )}
      </>
   );
}

export default Direction;
