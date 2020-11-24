import React from 'react';
import { View, StyleSheet } from "react-native";

import AddWordInput from "./AddWordInput";
import Button from "../Home/Button";

import { generateWordId } from "../../helpers";

type WordState = {
  id: number,
  origin: string,
  translation: string
};

type InputWrapperProps = {
  onClick: Function
}

export default class InputsWrapper extends React.Component<InputWrapperProps, WordState> {
  constructor(props: any){
    super(props);
    this.state = {
      id: generateWordId(),
      origin: "",
      translation: ""
    }

    this.updateOriginInput = this.updateOriginInput.bind(this);
    this.updateTranslationInput = this.updateTranslationInput.bind(this);
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

  render() {
    return (
      <View  >
        <View style={styles.linesWrapper}>
          <AddWordInput label="Origin" onChange={this.updateOriginInput} word={this.state.origin}/>
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="a-z" iconType="sort"/>
        </View>
        <View style={styles.buttonWrapper}>
          <AddWordInput label="Translation" onChange={this.updateTranslationInput} word={this.state.translation}/>
          <Button alignmentStyle={styles.buttonAlignment} buttonTitle="Add" iconType="check" fn={this.props.onClick} args={this.state}/>
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
