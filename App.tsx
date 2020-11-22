import React from "react";
import Navigation from "./navigation";
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return(
    <PaperProvider>
      <Navigation/>
    </PaperProvider>
  );
}
