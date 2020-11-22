import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WordDaily, Button, Statistics } from "../components";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.outerContainer}>
      <WordDaily />
      <View style={styles.buttonContainer}>
        <Button buttonTitle="Words" iconType="playlist-edit" fn={(arg:any)=>navigation.navigate(arg)} args="Words" />
        <Button buttonTitle="Play Quiz" iconType="play-circle" fn={(arg:any)=>navigation.navigate(arg)} args="Quiz" />
      </View>
      <Statistics/>
      <View style={styles.buttonContainer}>
        <Button buttonTitle="Share" iconType="share" fn={(arg:any)=>navigation.navigate(arg)} args="Share" />
        <Button buttonTitle="Settings" iconType="settings" fn={(arg:any)=>navigation.navigate(arg)} args="Settings" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create(
  {
    outerContainer: {
      flex:1,
    },
    buttonContainer: {
      flex:1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingTop: 20,
      paddingBottom: 5
    },

  }
);
