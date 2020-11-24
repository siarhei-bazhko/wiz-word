import React from "react";
import { Provider } from 'react-redux';

import Navigation from "./navigation";
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from "./helpers"

export default function App() {
  return(
    <Provider store={store}>
      <PaperProvider>
        <Navigation/>
      </PaperProvider>
    </Provider>
  );
}
