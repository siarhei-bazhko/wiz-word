import React, { useEffect } from "react";
import { connect } from "react-redux"
import { List } from 'react-native-paper';
import type { Word } from "../types/Word";
import { ScrollView } from "react-native";
import InputsWrapper from "../components/Words/InputsWrapper";
import ListItem from "../components/Words/ListItem";
import { deleteFlashcard, getFlashcards } from "../adaptations/offline";

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

const mapStateToProps = (state: any) => {
  const localWords = state?.words?.words ? state.words.words : [];
  const offlineWords = state.offline.words
  const isOffline = state.situations.isOffline
  return {
    userToken: state?.auth?.user?.userToken ? state.auth.user.userToken : null,
    words: isOffline ? offlineWords : localWords,
    isWordAdding: state?.words?.isWordAdding ? state.words.isWordAdding : false
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  deleteWord: async (id: number, userToken: string) => {
    await deleteFlashcard(dispatch, userToken, id)

  },
  getWords: async (userToken: string) => {
    await getFlashcards(dispatch, userToken)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Words)
