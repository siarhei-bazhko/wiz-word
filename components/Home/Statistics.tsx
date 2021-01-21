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
            <Subheading style={styles.progress}>progress</Subheading>
              <Divider />
            <ProgressBar progress={successRate/100} color={Colors.green300} style={{marginTop:20, height: 20, borderRadius: 10}}/>
          </View>
          <View style={{flex:2, marginHorizontal: 10}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              <Subheading style={styles.wordCount}>word count</Subheading>
              <Text style={styles.wordNumbers}>{wordCount}</Text>
            </View>
              <Divider/>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop: 20}}>
              <Subheading  style={styles.successRate}>success rate</Subheading>
              <Text style={styles.successNumbers}>{successRate}%</Text>
            </View>
              <Divider/>
          </View>
        </View>
    </Surface>
}
const styles = StyleSheet.create({
  successRate: {
    color: "black",
    textAlign: "left",
    fontFamily:"sans-serif-light"
  },

  successNumbers: {
    color: "red",
    textAlign: "right",
    fontSize: 17,
    fontWeight: "bold",
    alignSelf:"center",
    fontFamily:"sans-serif-light"
  },
  wordNumbers: {
    color: "blue",
    alignSelf:"center",
    textAlign: "right",
    fontSize: 17,
    fontWeight: "bold"
  },
  wordCount:{
    color: "black",
    textAlign: "left",
    fontFamily:"sans-serif-light"
  },
  headline: {
    textAlign: "center",
    paddingTop: 5,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 6
    ,
  },
  progress: {
    textAlign: "left",
    fontSize: 17,
    fontFamily:"sans-serif-light",
    paddingHorizontal: 5
  },
  surface: {
    flex: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#cce3e6",
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

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


