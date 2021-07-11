import React, { useState, useEffect } from "react";
import { StyleSheet,View, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { fbConfig } from "../../../../env";

const GOOGLE_PLACES_API_KEY = fbConfig.googleMapKey; // never save your real api key in a snack!

export default function AutoComplete() {
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {    
 }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'ko', // language of the results
        }}
        onPress={(data, details = null) => {
          console.log(data.place_id);
          setPlaceId(data.place_id)
        }}
        onFail={(error) => console.error(error)}
      />
      <Text>{placeId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
});
