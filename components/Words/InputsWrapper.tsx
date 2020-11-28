import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from "react-native";

import AddWordInput from "./AddWordInput";
import Button from "../Home/Button";

import { generateWordId } from "../../helpers";
import { addWordRequest, addWordSuccess } from '../../actions/wordsAction';
import type { Word } from "../../types/Word";


type InputWrapperProps = {
  addWord: Function
}

class InputsWrapper extends React.Component<InputWrapperProps, Word> {
  constructor(props: any){
    super(props);
      this.state = {
        id: generateWordId(),
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
    this.props.addWord(word);
    this.setState({
      id: generateWordId(),
      origin: "",
      translation: ""
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

const mapDispatchToProps = (dispatch: Function) => ({
  addWord: (newWordPair: any) => {
    dispatch(addWordRequest(newWordPair));
    dispatch(addWordSuccess());
  }
})

export default connect(null, mapDispatchToProps)(InputsWrapper)
