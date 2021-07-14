import React, { useState, useEffect, useRef } from "react";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Text,Dimensions } from 'react-native';
import * as Location from "expo-location";
import AutoComplete from "./AutoComplete";

export default function GoogleMap() {
   const [isLoading, setIsLoading] = useState(true);
   const [region, setRegion] = useState('');
   const [isSearch, setIsSearch] = useState(false);
   const mapView = React.createRef();   

   const getLocation = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const { coords } = await Location.getCurrentPositionAsync();        
       
        setRegion({
         latitude: coords.latitude,
         longitude: coords.longitude,
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
        })
        setIsLoading(false);
        console.log('wgy')
      } catch (error) {
        alert("Can't find you.", "So sad");
        console.log(error)
      }
   }

    
  const animateMap = async() => {
    mapView.current.animateToRegion(region,1000)
    //setIsSearch(false)
    console.log(region)
  }   

   useEffect(() => {
      if(isLoading)
        getLocation();

      if(isSearch){ 
        animateMap();
        
      }
   }, [isSearch]);
   return (
      <View style={styles.container}>
         {isLoading ? (
            <View style={styles.content}>
               <Text>Loading...</Text>
            </View>
         ):(
           <>
              
              <AutoComplete setRegion={setRegion} setIsSearch={setIsSearch}/>
              <MapView 
                provider={PROVIDER_GOOGLE} 
                region={region}
                ref={mapView}
                style={styles.map}>
                {isSearch ? (
                  <MapView.Marker coordinate={{ latitude: region.latitude, longitude: region.longitude, }} />
                ):(<></>)}
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
    position:'absolute',
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
   },
   map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/10*9,
    zIndex:1,
   },
});
