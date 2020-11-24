import React from "react";
import { connect } from "react-redux"
import { ScrollView } from "react-native-gesture-handler";
import { List } from 'react-native-paper';

import { ListItem, InputsWrapper } from "../components";

import { addWordRequest } from "../actions/wordsAction"

// type WordsProps = {

// }

type WordsState = {
  words: { id: number, origin: string, translation: string}[]
}

class Words extends React.Component<any, WordsState> {

  constructor(readonly props: {}) {
    super(props);
    // this.addWord = this.addWord.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
  }

  // addWord(newWordPair: any) {
    // this.setState((state: WordsState) => ({
    //   words: [newWordPair, ...state.words]
    // }));

  // }

  deleteWord(id: number) {
    const words = this.state.words.filter(word => word.id !== id);
    this.setState({
      words
    })
  }

  render() {
    return (
        <ScrollView>
          <InputsWrapper onClick={this.props.addWord}/>
          <List.Section>
            <List.Accordion
              title="School/University section"
              left={props => <List.Icon {...props} icon="folder" />}>
              {
                this.props.words.map(word => (
                  <ListItem
                   word={word}
                   deleteWord={this.deleteWord}
                  />
                ))
              }
            </List.Accordion>
          </List.Section>
        </ScrollView>
      );
  }
}

const mapStateToProps = (state: any) => ({
    words: state.words
})

const mapDispatchToProps = (dispatch: Function) => ({
  addWord: (newWordPair: any) => dispatch(addWordRequest(newWordPair))
})

export default connect(mapStateToProps, mapDispatchToProps)(Words)
