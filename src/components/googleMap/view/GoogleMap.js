import React, { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, View,Text, Dimensions } from 'react-native';
import * as Location from "expo-location";

export default function GoogleMap() {
   const [isLoading, setIsLoading] = useState(true);
   const [pos, setPos] = useState();

   const getLocation = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const { coords } = await Location.getCurrentPositionAsync();        
        setPos(coords)
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
        history.back();
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
            <>
               <MapView style={styles.map} zoom={20} initialRegion={{ latitude: pos.latitude, longitude: pos.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}> 
                  <MapView.Marker coordinate={{ latitude: pos.latitude, longitude: pos.longitude, }} />
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
      flex: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
   },
});
