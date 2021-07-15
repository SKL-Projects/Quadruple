import React, { useState, useEffect, useRef } from "react";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Text,Dimensions } from 'react-native';
import * as Location from "expo-location";
import AutoComplete from "./AutoComplete";
import MapViewDirections from 'react-native-maps-directions';
import { fbConfig } from "../../../../env";

const GOOGLE_API_KEY = fbConfig.googleMapKey; // never save your real api key in a snack!
const { width, height } = Dimensions.get('window');

export default function GoogleMap() {
   const [isLoading, setIsLoading] = useState(true);
   const [region, setRegion] = useState('');
   const [isSearch, setIsSearch] = useState(false);
   const mapView = React.createRef();   

   const coordinates = [
    {
      latitude: 40.748488, 
      longitude: -73.984525, 
    },
    {
      latitude: 40.221101,
      longitude: -74.755597,
    },
  ];

   const getLocation = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const { coords } = await Location.getCurrentPositionAsync();        
       
        setRegion({
         //latitude: coords.latitude,
         //longitude: coords.longitude,
         latitude: 40.1941472,
         longitude: -74.6777906,
         latitudeDelta: 2,
         longitudeDelta: 2,
        })
        setIsLoading(false);
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
                 <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_API_KEY} // insert your API Key here
                    strokeWidth={4}
                    strokeColor="#111111"
                    mode="TRANSIT"
                    onReady={result => {
                      console.log(`Distance: ${result.distance} km`)
                      console.log(`Duration: ${result.duration} min.`)
                    }}
                    onError={(errorMessage) => {
                      // console.log('GOT AN ERROR');
                    }}
                  />
                  <MapView.Marker coordinate={coordinates[0]} />
                  <MapView.Marker coordinate={coordinates[1]} />
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
    height: Dimensions.get('window').height,
    zIndex:1,
   },
});
