import React from 'react';
import { View, StyleSheet } from "react-native";

import AddWordInput from "./AddWordInput";
import Button from "../Home/Button";

export default class InputsWrapper extends React.Component {
  render() {
    return (
      <View  >
        <View style={styles.linesWrapper}>
          <AddWordInput/>
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="a-z" iconType="sort"/>
        </View>
        <View style={styles.buttonWrapper}>
          <AddWordInput/>
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="Add" iconType="check"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linesWrapper: {
    flexDirection: "row"
  },
  buttonWrapper: {
    flexDirection: "row"
  },
  buttonAlignment: {
    flex:1,
    alignSelf: "center",
  }
});
