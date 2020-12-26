import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Home, Words, Quiz, SignIn, SignUp, Settings } from "../screens";
import Titles from "../contants/headers";
import { connect } from "react-redux";
import { BatterySituation, NetworkSituation } from "../types/Adapation";

const Stack = createStackNavigator();

function RootNavigator({ userToken, energy, network }) {
   const isOffline = network === NetworkSituation.OFFLINE || energy === BatterySituation.LOW_BATTERY
   const displayLogin = isOffline ? false : (userToken === null ? true : false)
   console.log(`Can display log in ? ${displayLogin}`);
   console.log(`is Offline ? ${isOffline}`);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      { displayLogin ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: 'Sign In',
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Sign Up',
            }}
          />
        </>
        ) : (
        <>
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
        <Stack.Screen
          name="Settings"
          component={ Settings }
          options={{ title: Titles.SETTINGS_TITLE }}
        />
        {/* <Stack.Screen name="Share" component={Home} /> */}
        </>
      )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state: any) => ({
    network: state.situations.offline.network,
    energy: state.situations.energy.status,
    userToken: state.auth?.user?.userToken
})

export default connect(mapStateToProps, null)(RootNavigator)
