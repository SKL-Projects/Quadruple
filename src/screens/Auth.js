import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginContainer from "../components/auth/container/LoginContainer";

const Stack = createStackNavigator();

function Auth({ navigation }) {
   return <LoginContainer navigation={navigation} />;
}

export default Auth;
