import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googleMapKey } from "../../../../env";

const GOOGLE_API_KEY = googleMapKey; // never save your real api key in a snack!

function AutoComplete({ setRegion }) {
   return (
      <View style={styles.rootContainer}>
         <View style={styles.autoCompleteContainer}>
            <GooglePlacesAutocomplete
               placeholder="Search"
               style={styles.autoComplete}
               query={{
                  key: GOOGLE_API_KEY,
                  language: "ko", // language of the results
               }}
               onPress={(data, details = null) => {
                  setRegion({
                     formatted_address: details.formatted_address,
                     name: details.name,
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
      </View>
   );
}

const styles = StyleSheet.create({
   rootContainer: {
      position: "absolute",
      top: 20,
      width: "90%",
   },
   autoCompleteContainer: {
      flex: 1,
      position: "absolute",
      top: 30,
      zIndex: 999,
      width: "95%",
   },
});
export default AutoComplete;
