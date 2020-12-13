import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Home, Words, Quiz, SignIn, SignUp, Settings } from "../screens";
import Titles from "../contants/headers";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function RootNavigator({ userToken }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      { userToken === null ? (
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

const mapStateToProps = ({auth}: any) => ({
    userToken: auth?.user?.userToken
})

export default connect(mapStateToProps, null)(RootNavigator)
