import React from "react";
import { View, Text, StyleSheet, Systrace } from "react-native";
import { Button, Card, DataTable, List, Paragraph, TextInput, Title } from "react-native-paper";
import { connect } from "react-redux";
import { updateStatsRequest } from "../actions/wordsAction";

import type { Word } from "../types/Word"

 class Quiz extends React.Component {

  constructor(props : any) {
    super(props);
    const words = [...this.props.words];
    const totalWordsCount = words.length;
    const doneWords = [];
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
    const isCorrect = this.state.currentWord.translation === translation.trim().toLowerCase();
    const doneWord = Object.assign(this.state.currentWord, { isCorrect, userTranslation: translation });
    this.setState((prev) => ({
        doneWords: [...prev.doneWords, doneWord]
      }))
  }

  popWord() {
    this.checkWord(this.state.translation);

    const remainWords = [...this.state.words];
    remainWords.pop();

    this.setState((prev) => ({
      words: remainWords,
      // doneWords: [...prev.doneWords, currentWord],
      doneWordsCount: prev.doneWordsCount + 1,
      currentWord: remainWords[remainWords.length - 1],
    }))
  }

  componentDidUpdate () {
    if(this.state.doneWordsCount === this.state.totalWordsCount) {
      const correctWords = this.state.doneWords.reduce(((acc, word)=>{
        return word.isCorrect ? acc + 1 : acc
      }
      ), 0);
      const successRate = correctWords / this.state.totalWordsCount * 100;
      this.props.updateStats(successRate);
    }
  }

  render() {
    return (
    <View>
    { this.state.doneWordsCount !== this.state.totalWordsCount ?
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardStyle}>
        <Title style={styles.sourceWord}>{this.state.currentWord.origin}</Title>
        <Paragraph>{this.state.doneWordsCount + 1}/{this.state.totalWordsCount}</Paragraph>
      </Card.Content>
    <TextInput
      style={styles.input}
      label={"Type the translation..."}
      value={this.state.translation}
      mode="outlined"
      onChangeText={this.handleInput}
    />
    <View style={styles.buttonsContainer}>
      <Button>Skip</Button>
      <Button mode="contained" disabled={!this.state.translation} onPress={this.popWord}>OK</Button>
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
    paddingVertical: 40,
    alignItems: "center"
  },
  sourceWord: {
    paddingVertical: 20,
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

const mapStateToProps = (state: any) => ({
    words: state.words
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateStats: (successRate: number) => {
    dispatch(updateStatsRequest(successRate));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
