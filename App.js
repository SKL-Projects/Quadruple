import React, { useEffect } from "react";

import { ModalPortal } from "react-native-modals";
/*테마 */
import { ThemeProvider } from "styled-components";
import theme from "./src/lib/styles/theme";

/*리덕스 */
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import rootReducer, { rootSaga } from "./src/modules";

/*네비게이션 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import Auth from "./src/screens/Auth";
import CostScreen from "./src/screens/Cost";
import ProfileScreen from "./src/screens/Profile";

import Template from "./src/screens/Template";
import TravelScreen from "./src/screens/Travel.js";

/*리덕스 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

/* logbox */
import { LogBox, Platform } from "react-native";
import AppInit from "./AppInit";

if (Platform.OS !== "web") {
   LogBox.ignoreLogs([
      "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
      "%s: Calling %s on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
   ]);
}

/* 네비게이션 관련 */
const Stack = createStackNavigator();

/* 앱 함수 */
export default function App() {
   return (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <AppInit>
               <NavigationContainer>
                  <Stack.Navigator initialRouteName="Home">
                     <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="Auth"
                        component={Auth}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="Cost"
                        component={CostScreen}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="Travel"
                        component={TravelScreen}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="Template"
                        component={Template}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen name="Profile" component={ProfileScreen} />
                  </Stack.Navigator>
               </NavigationContainer>
               <ModalPortal />
            </AppInit>
         </Provider>
      </ThemeProvider>
   );
}
