import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/src/styles/colors";
import { connect } from "react-redux";
import { getFlashcards } from "../adaptations/proxy";
import api from "../api/firebase";
import { WordDaily, Button, Statistics } from "../components";
import { daysIntoYear, updateWordStats } from "../helpers/helpers";
import { BatterySituation, NetworkSituation } from "../types/Adapation";

class Home extends React.Component {
  constructor(props: any){
    super(props);
  }

  componentDidMount() {
    getFlashcards(this.props.dispatch, this.props.userToken);
  }

  render () {
  return (
    <View style={styles.outerContainer}>
     <Text style={ this.props.isOffline? styles.infoBarOffline : styles.infoBarOnline }> {this.props.isOffline ? "Offline" : "Online" }</Text>
      <WordDaily dailyWord={this.props.dailyWord}/>
      <Divider/>
      <View style={styles.buttonContainer}>
        <Button buttonTitle="Words" iconType="playlist-edit" fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Words" />
        <Button buttonTitle="Play Quiz" iconType="play-circle" fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Quiz" />
      </View>
      <Divider/>
      <Statistics wordCount={this.props.wordCount} successRate={this.props.successRate}/>
      <View style={styles.buttonContainer}>
        <Button buttonTitle="Share" iconType="share" disabled={true} fn={(arg:any)=>this.props.navigation.navigate(arg)} args="Share" />
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
      borderColor: "black",
      flex:1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingTop: 20,
      paddingBottom: 5,
    },

    infoBarOffline: {
      backgroundColor: 'lightgray',
      color: 'darkred',
      textAlign: 'center',
      fontWeight: "bold",
    },

    infoBarOnline: {
      backgroundColor: 'lightgray',
      color: 'darkgreen',
      textAlign: 'center',
      fontWeight: "bold",
    }

  }
);

const mapStateToProps = (state: any) => {
  const localWords = state?.words?.words ? state.words.words : [];
  const offlineWords = state.offline.words
  const isOffline = state.situations.offline.network === NetworkSituation.OFFLINE
                       || (state.situations.energy.energyOffline && !state.situations.forcedOffline)
                      //  || state.situations.energy.energyOffline
  const words = isOffline ? offlineWords : localWords;
  const successRate =  Math.round(words.reduce((acc, word : Word) => {
                        if(!word.totalRuns) {
                          return acc
                        }
                        acc += word.successRuns / word.totalRuns
                        return acc
                        }, 0) / words.length * 100) * 100 / 100;

  return {
    userToken: state.auth?.user?.userToken,
    isOffline,
    successRate: isNaN(successRate) ? 0 : successRate,
    wordCount: words?.length,
    dailyWord: words?.length
                  ? words[daysIntoYear(new Date) % words.length]
                  : { translation: "-",
                      origin: "Please, add some words"}
  }
}


export default connect(mapStateToProps, null)(Home);
