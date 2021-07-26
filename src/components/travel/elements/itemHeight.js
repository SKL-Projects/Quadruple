import { Dimensions } from "react-native";

export const LIST_ITEM_HEIGHT = 70;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

export const getSnapHeight = (length, curSnap) => {
   if (curSnap === 0) return length * LIST_ITEM_HEIGHT;
   else if (curSnap === 1) return length * LIST_ITEM_HEIGHT * 0.66;
   else if (curSnap === 2) return WINDOW_HEIGHT;
};

export const getMapHeight = (length, curSnap) => {
   return WINDOW_HEIGHT - getSnapHeight(length, curSnap) + LIST_ITEM_HEIGHT;
};
