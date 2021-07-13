import React, { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, View,Text, Dimensions } from 'react-native';
import * as Location from "expo-location";
import AutoComplete from "./AutoComplete";

export default function GoogleMap() {
   const [isLoading, setIsLoading] = useState(true);
   const [region, setRegion] = useState('');
   const [initialPos, setinitialPos] = useState('');

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
        setinitialPos(coords)
        setIsLoading(false);
      } catch (error) {
        alert("Can't find you.", "So sad");
        console.log(error)
      }
   };

   useEffect(() => {
      getLocation();      
   }, []);
   return (
      <View style={styles.container}>
         {isLoading ? (
            <View style={styles.content}>
               <Text>Loading...</Text>
            </View>
         ):(
            <View style={styles.content}>
                  <AutoComplete setRegion={setRegion}/>
                  <MapView style={styles.map} 
                     initialRegion={{ latitude: initialPos.latitude, longitude: initialPos.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
                     animateToCoordinate ={{ latitude: region.latitude, longitude: region.longitude},1000}
                  > 
                  <MapView.Marker coordinate={{ latitude: region.latitude, longitude: region.longitude, }} />
                </MapView>
            </View>
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
