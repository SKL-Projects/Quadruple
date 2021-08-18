import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../../../lib/styles/theme";
import SelectLocation from "../elements/SelectLocation";
import { addLikeBlock } from "../../../lib/api/Like";

function AddBlock({
   region,
   setRegion,
   onPressAddCancel,
   setRefresh,
   setLoading,
}) {
   // 수정 취소시, 이전 region으로 가기 위한 코드
   useEffect(() => {
      const reg = region;
      return () => setRegion(reg);
   }, []);

   // 이동 블록 추가
   const onCompleteLike = async () => {
      setLoading(true);
      const obj = {
         location: { ...region },
      };
      //파이어베이스 추가 + 로딩
      try {
         await addLikeBlock("aT1JPMs3GXg7SrkRE1C6KZPJupu1", 1627379541738, obj);
      } catch (err) {
         setLoading(false);
         return;
      }
      //리프레시
      onPressAddCancel();
      setRefresh((prev) => prev + 1);
   };

   return (
      <ScrollView style={[styles.container]}>
         <SelectLocation region={region} />
         <View style={styles.completeButtonContainer}>
            <Button
               containerStyle={styles.buttonContainerStyle}
               title="완료"
               titleStyle={{ fontSize: 20 }}
               type="clear"
               onPress={onCompleteLike}
            />
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "100%",
      marginBottom: 60,
      backgroundColor: theme.color.white,
   },
   completeButtonContainer: {
      width: "100%",
      alignItems: "center",
   },
   buttonContainerStyle: {
      width: 100,
   },
});

export default AddBlock;
