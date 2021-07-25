import { Dimensions } from "react-native";

export const LIST_ITEM_HEIGHT = 70;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

export const getSnapZeroHeight = (length) => {
   return length * LIST_ITEM_HEIGHT;
};
export const getSnapOneHeight = (length) => {
   return length * LIST_ITEM_HEIGHT * 0.66;
};
