import React from "react";
import { ListItem } from "react-native-elements";

export default function SwipeWhenNotActive({ children, isActive, ...props }) {
   return isActive ? (
      <ListItem {...props}>{children}</ListItem>
   ) : (
      <ListItem.Swipeable {...props}>{children}</ListItem.Swipeable>
   );
}
