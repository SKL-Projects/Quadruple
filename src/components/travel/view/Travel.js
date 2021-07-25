import React, { useCallback, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import GoogleMapContainer from "../container/GoogleMapContainer";
import BottomSheet from "reanimated-bottom-sheet";
import theme from "../../../lib/styles/theme";
import Panel from "../elements/Panel";
import Reanimated from "react-native-reanimated";
import {
   getSnapOneHeight,
   getSnapZeroHeight,
   LIST_ITEM_HEIGHT,
   WINDOW_HEIGHT,
} from "../elements/itemHeight";

function Travel({
   sheetRef,
   plans,
   length,
   markers,
   region,
   setRegion,
   itemRefs,
}) {
   const [curSnap, setCurSnap] = useState(0);
   const heightAim = useRef(
      new Animated.Value(
         WINDOW_HEIGHT - getSnapOneHeight(length) + LIST_ITEM_HEIGHT
      )
   ).current;

   const renderContent = useCallback(
      () => (
         <Panel
            plans={plans}
            setRegion={setRegion}
            curSnap={curSnap}
            itemRefs={itemRefs}
            length={length}
         />
      ),
      [plans, curSnap, itemRefs]
   );
   const renderHeader = useCallback(
      () => (
         <View style={styles.header}>
            <View style={styles.panelHeader}>
               <View style={styles.panelHandle} />
            </View>
         </View>
      ),
      []
   );

   // 바텀시트에 따른 높이 변경
   const { call, onChange } = Reanimated;
   let drawerCallbackNode = new Reanimated.Value(0);
   const onCallback = useCallback(
      ([value]) => {
         if (value < 0.2) {
            setCurSnap(0);
            if (curSnap !== 0) {
               Animated.timing(heightAim, {
                  toValue:
                     WINDOW_HEIGHT -
                     getSnapZeroHeight(length) +
                     LIST_ITEM_HEIGHT,
                  duration: 200,
                  useNativeDriver: false,
               }).start();
            }
         } else if (value >= 0.5) {
            setCurSnap(2);
            if (curSnap !== 2) {
               Animated.timing(heightAim, {
                  toValue: WINDOW_HEIGHT,
                  duration: 200,
                  useNativeDriver: false,
               }).start();
            }
         } else {
            setCurSnap(1);
            if (curSnap !== 1) {
               Animated.timing(heightAim, {
                  toValue:
                     WINDOW_HEIGHT -
                     getSnapOneHeight(length) +
                     LIST_ITEM_HEIGHT,
                  duration: 200,
                  useNativeDriver: false,
               }).start();
            }
         }
      },
      [curSnap]
   );

   return (
      <View style={styles.viewContainer}>
         <Animated.View
            style={{
               position: "absolute",
               height: heightAim,
            }}>
            <GoogleMapContainer
               markersInput={markers}
               region={region}
               setRegion={setRegion}
               itemRefs={itemRefs}
            />
         </Animated.View>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[
               getSnapZeroHeight(length),
               getSnapOneHeight(length),
               50,
            ]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={0}
            enabledContentTapInteraction={false}
            callbackNode={drawerCallbackNode}
         />
         <Reanimated.Code
            exec={onChange(
               drawerCallbackNode,
               call([drawerCallbackNode], onCallback)
            )}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      backgroundColor: theme.color.white,
   },
   header: {
      backgroundColor: theme.color.white,
      shadowColor: "#000000",
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 50,
   },
   panelHeader: {
      alignItems: "center",
   },
   panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#00000040",
      marginBottom: 10,
   },
});

export default Travel;
