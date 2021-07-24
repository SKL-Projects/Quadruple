import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import GoogleMapContainer from "../container/GoogleMapContainer";
import BottomSheet from "reanimated-bottom-sheet";
import theme from "../../../lib/styles/theme";
import Panel from "../elements/Panel";

const LIST_ITEM_HEIGHT = 70;

function Travel({ sheetRef, plans, length, markers, region, setRegion }) {
   const renderContent = () => <Panel plans={plans} setRegion={setRegion} />;
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

   return (
      <View style={styles.viewContainer}>
         <View style={{ position: "absolute", height: "100%" }}>
            <GoogleMapContainer
               markersInput={markers}
               region={region}
               setRegion={setRegion}
            />
         </View>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[
               length * LIST_ITEM_HEIGHT,
               length * LIST_ITEM_HEIGHT * 0.66,
               50,
            ]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={1}
            enabledContentTapInteraction={false}
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
