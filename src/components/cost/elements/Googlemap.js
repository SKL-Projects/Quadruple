import React, { useState, useEffect } from "react";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import AutoComplete from './AutoComplete'


const mapView = React.createRef();   

export default function Cost_map({currentCoordinate}) {
  
  const [region, setRegion] = useState('');  
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(0);

  const setLocation = async () => { //위치 가져오기
    try {
      setRegion({
        ...currentCoordinate,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
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
      setLocation();
  }, []);

  
  
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
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
            style={styles.map}
          > 
            {currentCoordinate && <MapView.Marker coordinate={currentCoordinate}/>}
          </MapView>
        )}
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  content: {
    position:'absolute',
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').height/2,
    zIndex:1,
  },
});