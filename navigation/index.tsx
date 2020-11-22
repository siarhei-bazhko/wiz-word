import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Home, Words, Quiz } from "../screens";
import Titles from "../contants/headers";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: Titles.HOME_TITLE }}
        />
        <Stack.Screen
          name="Words"
          component={Words}
          options={{ title: Titles.WORDS_TITLE }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ title: Titles.QUIZ_TITLE }}
        />
        {/* <Stack.Screen name="Settings" component={Home} /> */}
        {/* <Stack.Screen name="Share" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
