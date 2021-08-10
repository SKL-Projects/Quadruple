import React, { useCallback, useEffect, useRef, useState } from "react";
import { LogBox } from "react-native";
import { Keyboard } from "react-native";
import { getLikeListApi, removeLikeBlock } from "../../../lib/api/Like";
import Like from "../view/Like";
import * as Location from "expo-location";

LogBox.ignoreLogs(["Setting a timer"]);

function LikeContainer({ navigation }) {
   const [likeList, setLikeList] = useState([]);
   const sheetRef = useRef(null); // 바닥 시트 reference
   const [loading, setLoading] = useState(true);
   const [region, setRegion] = useState({
      // 현재 보여주는 지역
      latitude: 37.55594599999999,
      longitude: 126.972317,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
   });
   const [onAddBlock, setOnAddBlock] = useState(false); // 블록 추가 화면인지
   const [refresh, setRefresh] = useState(0); // 블록 다시 받아오기

   // 키보드 켰을땐 중간 사이즈, 껐을땐 큰사이즈로 자동조정
   useEffect(() => {
      const keyboardShowCallback = () => {
         sheetRef.current?.snapTo(1);
      };
      const keyboardHideCallback = () => {
         sheetRef.current?.snapTo(1);
      };

      Keyboard.addListener("keyboardDidShow", keyboardShowCallback);
      Keyboard.addListener("keyboardDidHide", keyboardHideCallback);
      return () => {
         Keyboard.removeAllListeners("keyboardDidShow");
         Keyboard.removeAllListeners("keyboardDidHide");
      };
   }, []);

   useEffect(() => {
      const getLikeList = async () => {
         setLoading(true);
         const res = await getLikeListApi(
            "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
            1627379541738
         );
         setLikeList(res?.likes);
         //없으면 현재 위치로 region 정하기
         if (!res?.likes || res.likes.length === 0) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
               try {
                  const { coords } = await Location.getCurrentPositionAsync({
                     accuracy: Location.Accuracy.Highest,
                  });
                  setRegion({
                     latitude: coords.latitude,
                     longitude: coords.longitude,
                     latitudeDelta: 0.01,
                     longitudeDelta: 0.01,
                  });
               } catch (err) {
                  console.log(err);
               }
            }
         } else {
            setRegion((prev) => ({
               ...prev,
               latitude: res.likes[0].location.latitude,
               longitude: res.likes[0].location.longitude,
            }));
         }
         setLoading(false);
      };
      getLikeList();
   }, [refresh]);

   const onPressAddBlock = useCallback(() => {
      setOnAddBlock(true);
   }, []);
   const onPressAddCancel = useCallback(() => {
      setOnAddBlock(false);
   }, []);

   // 블록 삭제
   const onRemoveBlock = useCallback(async (item) => {
      await removeLikeBlock(
         "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
         1627379541738,
         item
      );
      setRefresh((prev) => prev + 1);
   }, []);

   // 블록 클릭시, region을 누른 블록으로 지정함.
   // 단, 이동블록일 경우 delta를 경로가 최대한 다 보이도록 설정함.
   const onPressListItem = useCallback((location) => {
      let deltas = {
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
      };
      setRegion({
         ...deltas,
         ...location,
      });
   }, []);

   const addTravelBlock = (item) => {
      navigation.navigate("Travel", item.location);
   };

   return (
      <Like
         loading={loading}
         sheetRef={sheetRef}
         likeList={likeList}
         region={region}
         setRegion={setRegion}
         onAddBlock={onAddBlock}
         onPressAddBlock={onPressAddBlock}
         onPressAddCancel={onPressAddCancel}
         onRemoveBlock={onRemoveBlock}
         onPressListItem={onPressListItem}
         setRefresh={setRefresh}
         addTravelBlock={addTravelBlock}
      />
   );
}

export default LikeContainer;
