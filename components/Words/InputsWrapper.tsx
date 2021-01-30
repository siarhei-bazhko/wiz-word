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
import translateText from '../../api/dictionary'


type InputWrapperProps = {
  addWord: Function,
  userToken: string
}

class InputsWrapper extends React.Component<InputWrapperProps, Word> {
  constructor(props: any) {
    super(props);
    this.state = {
      refId: generateWordId(),
      origin: "",
      translation: "",
      dictionaryTranslation: "",
      totalRuns: 0,
      successRuns: 0,
    }

    this.updateOriginInput = this.updateOriginInput.bind(this);
    this.updateTranslationInput = this.updateTranslationInput.bind(this);
    this.addWord = this.addWord.bind(this);
    this.addDictionaryTranslation = this.addDictionaryTranslation.bind(this);
  }

  updateOriginInput(origin: string) {

    this.setState({
      origin,
    })

    //get transaltion from dictionary
    var self = this;
    translateText(origin)
      .then(trans => {
        self.setState({ dictionaryTranslation: trans });
      });


  }

  updateTranslationInput(translation: string) {
    this.setState({
      translation
    })
  }

  //add value of dictionary to tranlation field
  addDictionaryTranslation(dictionaryTranslation: string) {
    console.log(dictionaryTranslation)
    //fill the textinput with the word here
    this.setState({
      translation: dictionaryTranslation
    })

  }

  addWord(word: Word) {
    word.origin = word.origin.toLowerCase();
    word.translation = word.translation.toLowerCase();
    word.timestamp = Date.now();
    this.props.addWord(word, this.props.userToken);
    this.setState({
      refId: generateWordId(),
      origin: "",
      translation: ""
    })
  }

  render() {
    const disabled = !this.state.origin || !this.state.translation
    const disabledDictionary = !this.state.origin;
    return (
      <View style={{ paddingBottom: 12 }} >
        <View style={styles.linesWrapper}>
          <AddWordInput label="Origin" onChange={this.updateOriginInput} word={this.state.origin} />
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="a-z" iconType="sort" />
        </View>
        <View style={styles.buttonWrapper}>
          <AddWordInput label="Translation" onChange={this.updateTranslationInput} word={this.state.translation} />
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="Add" iconType="check" fn={this.addWord} args={this.state} disabled={disabled} />
        </View>

        <View style={disabledDictionary ? styles.hidden : styles.linesWrapper}>
          <Button buttonTitle={"Suggested translation: " + this.state.dictionaryTranslation} args={this.state.dictionaryTranslation} fn={this.addDictionaryTranslation}>
          </Button>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  linesWrapper: {
    flexDirection: "row",

  },
  buttonWrapper: {
    flexDirection: "row",
  },
  buttonAlignment: {
    flex: 2,
    alignSelf: "center",
  },
  hidden: {
   display: "none"
  }
});

const mapStateToProps = ({ auth }: any) => ({
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
