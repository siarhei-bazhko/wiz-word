import React, { useEffect } from "react";
import { connect } from "react-redux"
import { List } from 'react-native-paper';

import { deleteWordFailure, deleteWordRequest, deleteWordSuccess, getWordsFailure, getWordsRequest, getWordsSuccess } from "../actions/wordsAction"

import type { Word } from "../types/Word";
import { ScrollView } from "react-native";
import InputsWrapper from "../components/Words/InputsWrapper";
import ListItem from "../components/Words/ListItem";
import { deleteFlashcard, getFlashcards } from "../api/firebase";

type WordsProps = {
  words: Word[],
  deleteWord: Function,
  getWords: Function
}
class Words extends React.Component<WordsProps, Word[]> {

  constructor(readonly props: WordsProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getWords();
  }

  render() {
    return (
        <ScrollView>
          <InputsWrapper />
          <List.Section>
            <List.Accordion
              title="School/University section"
              left={props => <List.Icon {...props} icon="folder" />}>
              {
                this.props.words.map((word, index) => (
                  <ListItem
                   key={index}
                   word={word}
                   deleteWord={this.props.deleteWord}
                  />))
              }
            </List.Accordion>
          </List.Section>
        </ScrollView>
      );
  }
}

const mapStateToProps = (state: any) => ({
    words: state.words,
    isWordAdding: state.isWordAdding
})

const mapDispatchToProps = (dispatch: Function) => ({
  deleteWord: (id: number) => {
    dispatch(deleteWordRequest());
    deleteFlashcard(id).then((res) => {
      dispatch(deleteWordSuccess(res.msg));
    }).catch(err => {
      dispatch(deleteWordFailure(err.msg));
    })
    .then(() => {
      dispatch(getWordsRequest());
      return getFlashcards();
    })
    .then(flashcards => {
      dispatch(getWordsSuccess(flashcards));
    })
    .catch(err => {
      dispatch(getWordsFailure(err.msg));
    });
  },
  getWords: () => {
    dispatch(getWordsRequest());
    getFlashcards().then(flashcards => {
      dispatch(getWordsSuccess(flashcards));
    }).catch(err => {
      dispatch(getWordsFailure(err.msg));
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Words)
