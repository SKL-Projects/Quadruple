import React, { useState, useEffect } from "react";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";

const mapView = React.createRef();   

export default function Cost_map_coordinate() {
  
  const [region, setRegion] = useState('');  
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => { //위치 가져오기
    try {
      await Location.requestForegroundPermissionsAsync(); //퍼미션 받고
      const { coords } = await Location.getCurrentPositionAsync();     //내위치 가져와서 coords에
       
      setRegion({
        ...coords,
        latitudeDelta: 10,
        longitudeDelta: 10,
      })
      //setDirectionData( data.filter((x) => x.type=='transit') )
      setIsLoading(false);
    } catch (error) {
        alert("Can't find you.", "So sad");
        console.log(error)
    }
  }

  useEffect(() => {
    if(isLoading)
      getLocation();
  }, []);

  
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      ):(
        <MapView 
          provider={PROVIDER_GOOGLE} 
          region={region}
          ref={mapView}
          key="Gmap"
          style={styles.map}>       
        </MapView>
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