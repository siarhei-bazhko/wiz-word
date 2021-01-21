import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Card, DataTable, Divider, Paragraph, TextInput, Title } from "react-native-paper";
import { connect } from "react-redux";
import { offlineUpdateStats, updateStats } from "../actions/wordsAction";
import { BatterySituation, NetworkSituation } from "../types/Adapation";
import { Word } from "../types/Word";

 class Quiz extends React.Component {

  constructor(props : any) {
    super(props);
    const words = JSON.parse(JSON.stringify(this.props.words));
    const totalWordsCount = words.length;
    const doneWords: Word[] = [];
    this.state = {
      words,
      doneWords,
      currentWord: words[totalWordsCount - 1],
      doneWordsCount: 0,
      totalWordsCount,
      translation: ""
    }

    this.popWord = this.popWord.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.checkWord = this.checkWord.bind(this);
  }

  handleInput(input: string) {
      this.setState({
        translation: input
      })
  }


  checkWord(translation: string) {
    const isCorrect = this.state.currentWord.translation.trim().toLowerCase() === translation.trim().toLowerCase();
    const doneWord = Object.assign(this.state.currentWord, { isCorrect, userTranslation: translation });
    this.setState(prev => {
      console.log([...prev.doneWords, doneWord])

      return {
      doneWords: [...prev.doneWords, doneWord]
    }}, this.popWord)
  }

  popWord() {
    // this.checkWord(this.state.translation);

    const remainWords = [...this.state.words];
    remainWords.pop();

    this.setState((prev) => ({
      words: remainWords,
      // doneWords: [...prev.doneWords, currentWord],
      doneWordsCount: prev.doneWordsCount + 1,
      currentWord: remainWords[remainWords.length - 1],
    }))

    if(!remainWords.length) {
      const isOffline = this.props.network === NetworkSituation.OFFLINE
      || this.props.forcedOffline || this.props.energyOffline;

      const fn = isOffline
        ? offlineUpdateStats(this.props.words, this.state.doneWords)
        : updateStats(this.props.userToken, this.props.words, this.state.doneWords);
      // this.props.updateStats(fn, successRate);
      this.props.updateStats(fn)
    }
  }

  render() {
    return (
    <View>
    { !this.props.words.length
      ? <View>
          <Text style={{fontSize:24, textAlign:"center", paddingHorizontal: 10, paddingTop:20}}>Please add some words and start play!</Text>
        </View>
    :
    this.state.doneWordsCount !== this.state.totalWordsCount ?
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardStyle}>
        <View style={{backgroundColor: "lightgreen", paddingHorizontal: 100, borderRadius: 10}}>
        <Paragraph style={styles.sourceWord}>{this.state.currentWord.origin}</Paragraph>
        </View>
        <Paragraph style={{paddingTop: 20}}>Current word: {this.state.doneWordsCount + 1}/{this.state.totalWordsCount}</Paragraph>
      </Card.Content>
    <TextInput
      style={styles.input}
      label={"Type the translation..."}
      value={this.state.translation}
      mode="outlined"
      onChangeText={this.handleInput}
      />
    <View style={styles.buttonsContainer}>
      <Button onPress={()=>this.checkWord("")}>Skip</Button>
      <Button mode="contained" disabled={!this.state.translation} onPress={()=>this.checkWord(this.state.translation)}>OK</Button>
    </View>
    </Card>
    :
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Correct translation</DataTable.Title>
          <DataTable.Title>Your variant</DataTable.Title>
          <DataTable.Title numeric>Correct</DataTable.Title>
        </DataTable.Header>
          {
            this.state.doneWords.map(
              (word : {}, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{word.translation}</DataTable.Cell>
                  <DataTable.Cell>{word.userTranslation}</DataTable.Cell>
                  <DataTable.Cell style={word.isCorrect ? styles.resultCellTrue : styles.resultCellFalse}>
                    {word.isCorrect ? "Yes" : "No"}
                  </DataTable.Cell>
                </DataTable.Row>
              ))
          }
          </DataTable>
    </View>
    }
    </View>
  );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  cardStyle: {
    marginTop: 30,
    paddingVertical: 40,
    alignItems: "center"
  },
  sourceWord: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  input: {
    padding: 20
  },
  buttonsContainer : {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20
  },
  resultTable: {},
  resultCellFalse: {
    backgroundColor: "darkred",
  },
  resultCellTrue: {
    textAlign: "center",
    backgroundColor: "green",
  }
});

const mapStateToProps = (state: any) => {
  // TODO: refactor (ifce)
  const localWords = state?.words?.words ? state.words.words : [];
  const offlineWords = state.offline.words
  const isOffline = state.situations.offline.network === NetworkSituation.OFFLINE
                       || (state.situations.energy.energyOffline && !state.situations.forcedOffline)
  const words = isOffline ? offlineWords : localWords;
  return {
    words,
    network: state.situations.offline.network,
    forcedOffline: state.situations.forcedOffline,
    energyOffline: state.situations.energy.energyOffline,
    userToken: state?.auth?.user?.userToken
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    // updateStats: (actionFunction: Function, successRate: number) => {
    //   dispatch(actionFunction(successRate));
    // },
    updateStats: (actionFunction: Function) => {
      actionFunction(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
