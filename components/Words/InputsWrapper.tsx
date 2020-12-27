import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from "react-native";

import AddWordInput from "./AddWordInput";
import Button from "../Home/Button";

import { generateWordId } from "../../helpers";
import { addWordFailure, addWordRequest, addWordSuccess, getWordsFailure, getWordsRequest, getWordsSuccess } from '../../actions/wordsAction';
import type { Word } from "../../types/Word";
import { addFlashcard, getFlashcards } from '../../adaptations/proxy';
import api from '../../api/firebase';


type InputWrapperProps = {
  addWord: Function
}

class InputsWrapper extends React.Component<InputWrapperProps, Word> {
  constructor(props: any){
    super(props);
      this.state = {
        refId: generateWordId(),
        origin: "",
        translation: ""
      }

    this.updateOriginInput = this.updateOriginInput.bind(this);
    this.updateTranslationInput = this.updateTranslationInput.bind(this);
    this.addWord = this.addWord.bind(this);
  }

  updateOriginInput(origin: string) {
      this.setState({
        origin
      })
  }

  updateTranslationInput(translation: string) {
    this.setState({
      translation
    })
  }

  addWord(word: Word) {
    word.origin = word.origin.toLowerCase();
    word.translation = word.translation.toLowerCase();
    word.timestamp = Date.now();
    this.props.addWord(word, this.props.userToken);
    this.setState({
      refId: generateWordId(),
      // origin: "",
      // translation: ""
    })
  }

  render() {
    const disabled = !this.state.origin || !this.state.translation
    return (
      <View  >
        <View style={styles.linesWrapper}>
          <AddWordInput label="Origin" onChange={this.updateOriginInput} word={this.state.origin}/>
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="a-z" iconType="sort"/>
        </View>
        <View style={styles.buttonWrapper}>
          <AddWordInput label="Translation" onChange={this.updateTranslationInput} word={this.state.translation}/>
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="Add" iconType="check" fn={this.addWord} args={this.state} disabled={disabled}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linesWrapper: {
    flexDirection: "row"
  },
  buttonWrapper: {
    flexDirection: "row"
  },
  buttonAlignment: {
    flex:2,
    alignSelf: "center",
  }
});

const mapStateToProps = ({auth}: any) => ({
    userToken: auth?.user?.userToken
})

const mapDispatchToProps = (dispatch: Function) => ({
  addWord: (newWordPair: any, userToken: string) => {
    /**adding word localy */

    /**adding word remotely */

    addFlashcard(dispatch, userToken, newWordPair);

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputsWrapper)
