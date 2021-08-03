import { Dimensions } from "react-native";

export const LIST_ITEM_HEIGHT = 70;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

export const getSnapHeight = (curSnap) => {
   if (curSnap === 0) return 600;
   else return 400;
};

export const getMapHeight = (curSnap) => {
   return WINDOW_HEIGHT - getSnapHeight(curSnap) + LIST_ITEM_HEIGHT;
};