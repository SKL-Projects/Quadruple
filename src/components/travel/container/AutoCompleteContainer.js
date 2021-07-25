import React from "react";
import { View } from "react-native";
import AutoComplete from "../view/AutoComplete";

function AutoCompleteContainer({ navigation, setRegion }) {
   return (
      <View style={{ position: "absolute", top: 20, width: "90%" }}>
         <AutoComplete navigation={navigation} setRegion={setRegion} />
      </View>
   );
}

export default React.memo(AutoCompleteContainer);
