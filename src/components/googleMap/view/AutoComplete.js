import React from "react";
import { StyleSheet, View,Text, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { fbConfig } from "../../../../env";

const GOOGLE_PLACES_API_KEY = fbConfig.googleMapKey; // never save your real api key in a snack!

export default function AutoComplete( props ) {
  

  return (
    <View style={styles.autoCompleteContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        style={styles.autoComplete}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'ko', // language of the results
        }}
        onPress={(data, details = null) => {
          //console.log(details.geometry.location);
          props.setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });                    
        }}
        fetchDetails={true}
        onFail={(error) => console.error(error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  autoCompleteContainer:{
    flex: 1,
    position:'absolute',
    top:30,
    zIndex:999,
    width:'95%'
  },
});

