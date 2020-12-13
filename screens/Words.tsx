import React, { useEffect } from "react";
import { connect } from "react-redux"
import { List } from 'react-native-paper';

import { deleteWordFailure, deleteWordRequest, deleteWordSuccess, getWordsFailure, getWordsRequest, getWordsSuccess } from "../actions/wordsAction"

import type { Word } from "../types/Word";
import { ScrollView } from "react-native";
import InputsWrapper from "../components/Words/InputsWrapper";
import ListItem from "../components/Words/ListItem";
import api from "../api/firebase";

type WordsProps = {
  userToken: string,
  words: Word[],
  deleteWord: Function,
  getWords: Function,
}
class Words extends React.Component<WordsProps, Word[]> {

  constructor(readonly props: WordsProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getWords(this.props.userToken);
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
                this.props.words instanceof Array ?
                this.props.words.map((word, index) => (
                  <ListItem
                    key={index}
                    word={word}
                    deleteWord={this.props.deleteWord}
                    userToken={this.props.userToken}
                  />))
                  : null
              }
            </List.Accordion>
          </List.Section>
        </ScrollView>
      );
  }
}

const mapStateToProps = (state: any) => ({
    userToken: state?.auth?.user?.userToken ? state.auth.user.userToken : null,
    words: state?.words?.words ? state.words.words : [],
    isWordAdding: state?.words?.isWordAdding ? state.words.isWordAdding : false
})

const mapDispatchToProps = (dispatch: Function) => ({
  deleteWord: async (id: number, userToken: string) => {
    const call = api(userToken);
    dispatch(deleteWordRequest());
    try {
      const res = await call.deleteFlashcard(id)
      dispatch(deleteWordSuccess(res.msg));
    } catch (err) {
      dispatch(deleteWordFailure(err.msg))
    }

    try {
      dispatch(getWordsRequest());
      const flashcards = await call.getFlashcards();
      dispatch(getWordsSuccess(flashcards));
    } catch (err) {
      dispatch(getWordsFailure(err.msg));
    }

  },
  getWords: (userToken: string) => {
    const call = api(userToken);
    dispatch(getWordsRequest());
    call.getFlashcards()
      .then(flashcards => { dispatch(getWordsSuccess(flashcards)); })
      .catch(err => { dispatch(getWordsFailure(err.msg));});
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Words)
