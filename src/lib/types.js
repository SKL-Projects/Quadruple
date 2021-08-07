export const TRANSIT = "transit";
export const WAYPOINT = "waypoint";
export const START = "start";
export const END = "end";

export const TRAVEL = "travel";

export const detailTypes = {
   HOTEL: "hotel",
   FOOD: "food",
   SHOPPING: "shopping",
   SIGHTSEE: "sightsee",
   ACTIVITY: "activity",
   ETC_WAYPOINT: "etc_waypoint",
   MY_CAR: "mycar",
   TRAIN: "train",
   AIRLINE: "airline",
   BUS: "bus",
   WALKING: "walking",
   ETC_TRANSIT: "etc_transit",
};

export const bindDetailTypes = [
   [
      { name: "숙소", value: detailTypes.HOTEL },
      { name: "음식점", value: detailTypes.FOOD },
      { name: "쇼핑", value: detailTypes.SHOPPING },
      { name: "관광", value: detailTypes.SIGHTSEE },
      { name: "액티비티", value: detailTypes.ACTIVITY },
      { name: "기타", value: detailTypes.ETC_WAYPOINT },
   ],
   [
      { name: "자차", value: detailTypes.MY_CAR },
      { name: "기차", value: detailTypes.TRAIN },
      { name: "항공", value: detailTypes.AIRLINE },
      { name: "버스", value: detailTypes.BUS },
      { name: "도보", value: detailTypes.WALKING },
      { name: "기타", value: detailTypes.ETC_TRANSIT },
   ],
];
