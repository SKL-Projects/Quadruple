import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useDispatch } from "react-redux";
import { signin } from "./src/modules/auth";
import { fbAuth } from "./firebase";

function AppInit({ children }) {
   const [isReady, setIsReady] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      fbAuth.onAuthStateChanged((user) => {
         if (user) {
            dispatch(signin(user));
         }
      });
   }, []);

   const init = async () => {};

   if (!isReady) {
      return (
         <AppLoading
            startAsync={init}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
         />
      );
   }
   return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default AppInit;
