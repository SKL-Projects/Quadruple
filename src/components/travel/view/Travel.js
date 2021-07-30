import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import GoogleMapContainer from "../container/GoogleMapContainer";
import BottomSheet from "reanimated-bottom-sheet";
import theme from "../../../lib/styles/theme";
import Panel from "../elements/Panel";
import Reanimated from "react-native-reanimated";
import {
   getMapHeight,
   getSnapHeight,
   WINDOW_HEIGHT,
} from "../elements/itemHeight";
import AddBlock from "../container/AddBlock";
import { FAB } from "react-native-elements";

function Travel({
   sheetRef,
   plans,
   length,
   markers,
   region,
   setRegion,
   itemRefs,
   onAddBlock,
   onPressAddBlock,
   onPressAddCancel,
}) {
   const [curSnap, setCurSnap] = useState(0);
   const heightAim = useRef(
      new Animated.Value(getMapHeight(length, curSnap))
   ).current;

   // 리스트 길이 변경시, 현재 snap에 맞춰서 맵 높이 변경
   useEffect(() => {
      changeMapHeight(getMapHeight(length, curSnap));
   }, [length]);

   // 맵 높이 변경 함수
   const changeMapHeight = useCallback((height) => {
      Animated.timing(heightAim, {
         toValue: height,
         duration: 200,
         useNativeDriver: false,
      }).start();
   }, []);

   const renderContent = (onAddBlock) => {
      return (
         <View
            style={[
               styles.panel,
               {
                  height: getSnapHeight(curSnap),
               },
            ]}>
            {onAddBlock ? (
               <AddBlock
                  plans={plans}
                  region={region}
                  height={getSnapHeight(curSnap)}
               />
            ) : (
               <Panel plans={plans} setRegion={setRegion} itemRefs={itemRefs} />
            )}
            <View
               style={{
                  position: "absolute",
                  bottom: 80,
                  right: 20,
                  zIndex: 100,
               }}>
               <FAB
                  visible={true}
                  raised
                  icon={{
                     name: onAddBlock ? "times" : "plus",
                     type: "font-awesome",
                  }}
                  buttonStyle={{
                     width: 60,
                     height: 60,
                     borderRadius: 30,
                     backgroundColor: "white",
                  }}
                  onPress={onAddBlock ? onPressAddCancel : onPressAddBlock}
               />
            </View>
         </View>
      );
   };
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
               changeMapHeight(getMapHeight(0));
            }
         } else if (value >= 0.5) {
            setCurSnap(2);
            if (curSnap !== 2) {
               changeMapHeight(WINDOW_HEIGHT);
            }
         } else {
            setCurSnap(1);
            if (curSnap !== 1) {
               changeMapHeight(getMapHeight(1));
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
               regionInput={region}
               setRegion={setRegion}
               itemRefs={itemRefs}
            />
         </Animated.View>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[getSnapHeight(0), getSnapHeight(1), 50]}
            renderContent={() => renderContent(onAddBlock)}
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
   panel: {
      padding: 20,
      backgroundColor: theme.color.white,
   },
});

export default Travel;
