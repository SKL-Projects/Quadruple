import { Dimensions } from "react-native";
import { WINDOW_HEIGHT } from "../../../lib/styles/pixels";

export const LIST_ITEM_HEIGHT = 70;

export const getSnapHeight = (curSnap) => {
   if (curSnap === 0) return Dimensions.get("window").height * 0.7;
   else return Dimensions.get("window").height * 0.4;
};

export const getMapHeight = (curSnap) => {
   return WINDOW_HEIGHT - getSnapHeight(curSnap) + LIST_ITEM_HEIGHT;
};
