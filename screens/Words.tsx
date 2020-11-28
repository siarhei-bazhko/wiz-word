import React from "react";
import { connect } from "react-redux"
import { ScrollView } from "react-native-gesture-handler";
import { List } from 'react-native-paper';

import { ListItem, InputsWrapper } from "../components";

import { addWordRequest, addWordSuccess, deleteWordRequest } from "../actions/wordsAction"

import type { Word } from "../types/Word";

type WordsProps = {
  words: Word[],
  deleteWord: Function
}
class Words extends React.Component<WordsProps, Word[]> {

  constructor(readonly props: WordsProps) {
    super(props);
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
    dispatch(deleteWordRequest(id));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Words)
