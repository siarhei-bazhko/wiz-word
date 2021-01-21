import React from "react";
import { Provider } from 'react-redux';

import Navigation from "./navigation";
import { Provider as PaperProvider,DefaultTheme, configureFonts } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from "./helpers"

import init from "./adaptations/index";
const fonts ={
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
      web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  }
}
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: '#f1c40f',
    fonts: configureFonts(fonts)
  },
};
export default function App() {
  init();
  return(
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}
      >
        <PaperProvider theme={theme}>
          <Navigation/>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
