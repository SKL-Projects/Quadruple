import { WINDOW_HEIGHT } from "../../../lib/styles/pixels";

export const LIST_ITEM_HEIGHT = 70;
export const getSnapHeight = (curSnap) => {
   if (curSnap === 0) return 600;
   else return 400;
};

export const getMapHeight = (curSnap) => {
   return WINDOW_HEIGHT - getSnapHeight(curSnap) + LIST_ITEM_HEIGHT;
};
