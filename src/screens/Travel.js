import React from "react";
import TravelContainer from "../components/travel/container/TravelContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LikeContainer from "../components/like/container/LikeContainer";
import { Button, Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export default function TravelScreen({}) {
   return (
      <Tab.Navigator initialRouteName="Travel">
         <Tab.Screen
            name="Like"
            component={LikeContainer}
            options={{
               tabBarLabel: "찜",
               tabBarIcon: (props) => (
                  <Icon {...props} name="heart" type="font-awesome" />
               ),
            }}
         />
         <Tab.Screen
            name="Travel"
            component={TravelContainer}
            options={{
               tabBarLabel: "일정",
               tabBarIcon: (props) => (
                  <Icon {...props} name="road" type="font-awesome" />
               ),
            }}
         />
      </Tab.Navigator>
   );
}
