import React from "react";
import TravelContainer from "../components/travel/container/TravelContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LikeContainer from "../components/like/container/LikeContainer";
import CostContainer from "../components/cost/container/CostContainer";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export default function TravelScreen({}) {
   // 여기에 비슷한 형식으로 넣으면 됨.
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
         <Tab.Screen
            name="Cost"
            component={CostContainer}
            options={{
               tabBarLabel: "가계부",
               tabBarIcon: (props) => (
                  <Icon {...props} name="calculator" type="font-awesome" />
               ),
            }}
         />
      </Tab.Navigator>
   );
}
