import React from "react";

/*테마 */
import { ThemeProvider } from "styled-components";
import theme from "./src/lib/styles/theme";

/*리덕스 */
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./src/modules";

/*네비게이션 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";

import { fbAuth } from "./firebase";
import GoogleMap from "./src/screens/GoogleMap";
import AutoComplete from "./src/screens/AutoComplete.js";

/*리덕스 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

/* 네비게이션 관련 */
const Stack = createStackNavigator();

/* 앱 함수 */
export default function App() {
   return (
      <Provider store={store}>
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
                  name="GoogleMap"
                  component={GoogleMap}
                  options={{ headerShown: false }}
               />
               <Stack.Screen
                  name="AutoComplete"
                  component={AutoComplete}
                  options={{ headerShown: false }}
               />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
