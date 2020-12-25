import React from "react";
import { Provider } from 'react-redux';

import Navigation from "./navigation";
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from "./helpers"

import init from "./adaptations/index";

export default function App() {
  init();
  return(
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}
      >
        <PaperProvider>
          <Navigation/>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
