import React, { useState, useEffect } from "react";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import AutoComplete from '../elements/AutoComplete'


const mapView = React.createRef();   

export default function Cost_map(props) {
  
  const [region, setRegion] = useState('');  
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(0);

  const setLocation = async () => { //위치 가져오기
    try {
      setRegion({
        latitude:40.74399,
        longitude:-74.03236,
        latitudeDelta: 1,
        longitudeDelta: 1,
      })
      //setDirectionData( data.filter((x) => x.type=='transit') )
      setIsLoading(false);
    } catch (error) {
        alert("Can't find you.", "So sad");
        console.log(error)
    }
  }

   const handleMapPress = (latlng) => {
    
    const pos = {
      ...latlng,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    }
    setRegion(pos) 
    setVisible(1)
    props.setcoordinate(pos)
  }

  useEffect(() => {
    if(isLoading)
      setLocation();
  }, []);

  
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      ):(
        <>
        <AutoComplete setRegion={setRegion}/>
        <MapView 
          provider={PROVIDER_GOOGLE} 
          region={region}
          ref={mapView}
          onPress={(e) =>handleMapPress(e.nativeEvent.coordinate)}
          key="Gmap"
          style={styles.map}
        > 
          {visible ? (<MapView.Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}/>) : (<></>)}
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