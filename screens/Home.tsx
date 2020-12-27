import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { WordDaily, Button, Statistics } from "../components";
import { daysIntoYear } from "../helpers/helpers";
import { BatterySituation, NetworkSituation } from "../types/Adapation";

class Home extends React.Component {
  constructor(props: any){
    super(props);
  }

  render () {
  return (
    <View style={styles.outerContainer}>
      <WordDaily dailyWord={this.props.dailyWord}/>
      <View style={styles.buttonContainer}>
        <Button buttonTitle="Words" iconType="playlist-edit" fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Words" />
        <Button buttonTitle="Play Quiz" iconType="play-circle" fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Quiz" />
      </View>
      <Statistics wordCount={this.props.wordCount} successRate={this.props.successRate}/>
      <View style={styles.buttonContainer}>
        <Button buttonTitle="Share" iconType="share" fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Share" />
        <Button buttonTitle="Settings" iconType="settings" fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Settings" />
      </View>
    </View>
  );
  }
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

const mapStateToProps = (state: any) => {
  const localWords = state?.words?.words ? state.words.words : [];
  const offlineWords = state.offline.words
  const isOffline = state.situations.offline.network === NetworkSituation.OFFLINE
                       || state.situations.energy.forcedOffline
  const words = isOffline ? offlineWords : localWords;
  const successRate = isOffline
                      ? state.offline.successRate
                      : state.words.successRate;

  return {
    successRate,
    wordCount: words?.length,
    dailyWord: words?.length
                  ? words[daysIntoYear(new Date) % words.length]
                  : { translation: "Sorry, you havent added anything yet",
                      origin: "Please, add some words"}
  }
}


export default connect(mapStateToProps, null)(Home);
