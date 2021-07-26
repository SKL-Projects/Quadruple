import React, { memo } from "react";
import { View } from "react-native";

export const start = (height) => (
   <>
      <View
         style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "#7F7FD5",
         }}
      />
      <View
         style={{
            position: "absolute",
            top: 8,
            width: 5,
            height: height / 2,
            backgroundColor: "#7F7FD5",
         }}
      />
   </>
);

export const end = (height) => (
   <>
      <View
         style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "#7F7FD5",
         }}
      />
      <View
         style={{
            position: "absolute",
            bottom: 8,
            width: 5,
            height: height / 2,
            backgroundColor: "#7F7FD5",
         }}
      />
   </>
);

export const basicVetical = (height, type) => (
   // type === "transit" 이면 이동 블록
   <View
      style={{
         width: 5,
         height: height,
         backgroundColor: type === "transit" ? "#20B2AA" : "#7F7FD5",
      }}
   />
);
