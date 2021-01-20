import React from "react";
import { Surface, Subheading, Headline, Divider, ProgressBar, Colors } from 'react-native-paper';
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";


export default function Statistics({ wordCount, successRate }) {
  return <Surface style={styles.surface}>
        <Headline style={styles.headline}>
          Statistics
        </Headline>
        <View style={styles.outerContainer}>
          <View style={{flex:3}}>
            <Subheading style={styles.progress}>Progress</Subheading>
            <Divider />
            <ProgressBar progress={successRate/100} color={Colors.greenA700} style={{marginTop:20}}/>
          </View>
          <View style={{flex:2, paddingBottom: 20}}>
            <View>
              <Subheading style={styles.wordCount}>Word count</Subheading>
              <Divider />
              <Text style={styles.wordNumbers}>{wordCount}</Text>
            </View>
            <View>
              <Subheading>Success Rate</Subheading>
              <Divider />
              <Text style={styles.successNumbers}>{successRate}%</Text>
            </View>
          </View>
        </View>
    </Surface>
}
const styles = StyleSheet.create({
  successNumbers: {
    color: "red",
    textAlign: "right",
    fontSize: 17,
    fontWeight: "bold"
  },
  wordNumbers: {
    color: "blue",
    textAlign: "right",
    fontSize: 17,
    fontWeight: "bold"
  },
  wordCount:{
    paddingTop:20,
    color: "black",
    textAlign: "left"
  },
  headline: {
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 10
  },
  progress: {
    textAlign: "left",
    fontSize: 19,
  },
  surface: {
    flex: 8,
    // padding: 20,

  },
  outerContainer: {
    margin:10,
    flex:1,
    alignItems: "stretch",
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
  progressContainer: {

  }
});


