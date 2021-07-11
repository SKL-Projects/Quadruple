import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginContainer from "../components/auth/container/LoginContainer";
import SignUpContainer from "../components/auth/container/SignUpContainer";

const Stack = createStackNavigator();

function Auth() {
   return (
      <Stack.Navigator initialRouteName="Log in">
         <Stack.Screen name="Log in" component={LoginContainer} />
         <Stack.Screen name="Sign up" component={SignUpContainer} />
      </Stack.Navigator>
   );
}

export default Auth;
