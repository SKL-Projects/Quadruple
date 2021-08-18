import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import GoogleMapContainer from "../container/GoogleMapContainer";
import BottomSheet from "reanimated-bottom-sheet";
import theme from "../../../lib/styles/theme";
import Panel from "../elements/Panel";
import Reanimated from "react-native-reanimated";
import { getMapHeight, getSnapHeight } from "../elements/itemHeight";
import AddBlock from "../container/AddBlock";
import { FAB } from "react-native-elements";
import { WINDOW_HEIGHT } from "../../../lib/styles/pixels";

function Travel({
   sheetRef,
   plans,
   region,
   setRegion,
   onAddBlock,
   onPressAddBlock,
   onPressAddCancel,
   setRefresh,
   openEditModal,
   onDragEnd,
   onRemoveBlock,
   onPressListItem,
   setLoading,
}) {
   const [curSnap, setCurSnap] = useState(1);
   const heightAim = useRef(new Animated.Value(getMapHeight(curSnap))).current;
   const listRef = useRef(); // 마커 클릭시 블록목록 스크롤을 위한 ref

   // 리스트 길이 변경시, 현재 snap에 맞춰서 맵 높이 변경
   useEffect(() => {
      changeMapHeight(getMapHeight(curSnap));
   }, []);

   // 맵 높이 변경 함수
   const changeMapHeight = useCallback((height) => {
      Animated.timing(heightAim, {
         toValue: height,
         duration: 200,
         useNativeDriver: false,
      }).start();
   }, []);

   // 바텀 시트 안 내용.
   // 수정모드일때는 AddBlock이 렌더됨.
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
                  setRegion={setRegion}
                  onPressAddCancel={onPressAddCancel}
                  setRefresh={setRefresh}
                  setLoading={setLoading}
               />
            ) : (
               <Panel
                  plans={plans}
                  listRef={listRef}
                  openEditModal={openEditModal}
                  onDragEnd={onDragEnd}
                  onRemoveBlock={onRemoveBlock}
                  onPressListItem={onPressListItem}
               />
            )}
            <View style={styles.fabView}>
               <FAB
                  visible={true}
                  raised
                  icon={{
                     name: onAddBlock ? "times" : "plus",
                     type: "font-awesome",
                  }}
                  buttonStyle={styles.fabButton}
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
               regionInput={region}
               setRegion={setRegion}
               listRef={listRef}
               plans={plans}
            />
         </Animated.View>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[getSnapHeight(0), getSnapHeight(1), 50]}
            renderContent={() => renderContent(onAddBlock)}
            renderHeader={renderHeader}
            initialSnap={1}
            enabledContentGestureInteraction={false}
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
      padding: 10,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: theme.color.white,
   },
   fabView: {
      position: "absolute",
      bottom: 80,
      left: 20,
      zIndex: 100,
   },
   fabButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "white",
   },
});

export default Travel;
