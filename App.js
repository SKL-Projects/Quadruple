import React from "react";

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
            <Stack.Navigator initialRouteName="홈">
               <Stack.Screen name="홈" component={HomeScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
