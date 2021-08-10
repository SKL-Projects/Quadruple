import React, { useEffect, useRef, useState } from "react";
import GoogleMap from "../view/GoogleMap";

function GoogleMapContainer({ region, setRegion }) {
   const mapViewRef = useRef();
   const [thisRegion, setThisRegion] = useState();

   useEffect(() => {
      mapViewRef.current?.animateToRegion(region, 900);
   }, [region]);

   const onAnimateRegion = () => {
      setThisRegion(region);
   };

   return (
      <GoogleMap
         setRegion={setRegion}
         region={thisRegion}
         mapViewRef={mapViewRef}
         onAnimateRegion={onAnimateRegion}
      />
   );
}

export default GoogleMapContainer;
