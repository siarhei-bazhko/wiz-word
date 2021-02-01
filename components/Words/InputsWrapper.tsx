import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Picker } from "react-native";

import AddWordInput from "./AddWordInput";
import Button from "../Home/Button";

import { generateWordId } from "../../helpers";
import { addWordFailure, addWordRequest, addWordSuccess, getWordsFailure, getWordsRequest, getWordsSuccess } from '../../actions/wordsAction';
import type { Word } from "../../types/Word";
import { addFlashcard, getFlashcards } from '../../adaptations/proxy';
import api from '../../api/firebase';
import translateText from '../../api/dictionary'
import { BatterySituation, NetworkSituation } from "../../types/Adapation"
import { store } from "../../helpers/reduxStore";



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
      language: "default",
      totalRuns: 0,
      successRuns: 0,
    }

    this.updateOriginInput = this.updateOriginInput.bind(this);
    this.updateTranslationInput = this.updateTranslationInput.bind(this);
    this.addWord = this.addWord.bind(this);
    this.addDictionaryTranslation = this.addDictionaryTranslation.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);

  }

  updateOriginInput(origin: string) {

    this.setState({
      origin
    })

    if (this.state.language && this.state.language !== "default") {
      this.dictionaryCall(origin, this.state.language);
    }
  }

  dictionaryCall(word: string, language: string) {
    const network = store.getState().situations.offline.network;
    const energyOffline = store.getState().situations.energy.energyOffline;
    const isOffline = network === NetworkSituation.OFFLINE || energyOffline;

    //get translation from dictionary
    if (!isOffline) {
      var self = this;
      translateText(word, language)
        .then(trans => {
          self.setState({ dictionaryTranslation: trans });
        });
    }
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

  updateLanguage(language: string) {
    this.setState({
      language
    })

    if (this.state.language && this.state.language !== "default") {
      this.dictionaryCall(this.state.origin, language);
    }
  }


  addWord(word: Word) {
    word.origin = word.origin.toLowerCase();
    word.translation = word.translation.toLowerCase();
    word.timestamp = Date.now();

    const newWord = JSON.parse(JSON.stringify(word))
    delete newWord.dictionaryTranslation
    delete newWord.language

    this.props.addWord(newWord, this.props.userToken);

    this.setState({
      refId: generateWordId(),
      origin: "",
      translation: ""
    })
  }

  render() {
    const disabled = !this.state.origin || !this.state.translation

    const network = store.getState().situations.offline.network;
    const energyOffline = store.getState().situations.energy.energyOffline;
    const isOffline = network === NetworkSituation.OFFLINE || energyOffline;

    const disabledDictionary = !this.state.origin || isOffline || !this.state.language || this.state.language === "default";

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

        <View style={styles.container}>

          <View style={styles.dictionary}>
            <View style={disabledDictionary ? styles.hidden : styles.dictionary
            }>
              <Button buttonTitle={"Suggestion: " + this.state.dictionaryTranslation} args={this.state.dictionaryTranslation} fn={this.addDictionaryTranslation}>
              </Button>
            </View>
          </View>

          <View style={isOffline ? styles.hidden : styles.selector}>

            <Picker
              style={{ height: 50, width:110 }}
              selectedValue={this.state.language}
              onValueChange={this.updateLanguage}
            >
              <Picker.Item label="Select" value="default" />
              <Picker.Item label="Arabic" value="ar" />
              <Picker.Item label="Bulgarian" value="bg" />
              <Picker.Item label="Chinese" value="zh-Hans" />
              <Picker.Item label="Croatian" value="hr" />
              <Picker.Item label="Czech" value="cs" />
              <Picker.Item label="Danish" value="da" />
              <Picker.Item label="Dutch" value="nl" />
              <Picker.Item label="Filipino" value="fil" />
              <Picker.Item label="Finnish" value="fi" />
              <Picker.Item label="French" value="fr" />
              <Picker.Item label="German" value="de" />
              <Picker.Item label="Greek" value="el" />
              <Picker.Item label="Hungarian" value="hu" />
              <Picker.Item label="Italian" value="it" />
              <Picker.Item label="Japanese" value="ja" />
              <Picker.Item label="Kazakh" value="kk" />
              <Picker.Item label="Korean" value="ko" />
              <Picker.Item label="Norwegian" value="nb" />
              <Picker.Item label="Polish" value="pl" />
              <Picker.Item label="Portuguese" value="pt" />
              <Picker.Item label="Russian" value="ru" />
              <Picker.Item label="Spanish" value="es" />
              <Picker.Item label="Swedish" value="sv" />
              <Picker.Item label="Thai" value="th" />
              <Picker.Item label="Turkish" value="tr" />
              <Picker.Item label="Vietnamese" value="vi" />
            </Picker>
          </View>
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
  },
  dictionary: {
    flex: 10,
    paddingLeft: 10,
    paddingTop: 5,
    alignSelf: "flex-start"
  },
  selector: {
    alignSelf: "center",
    flex: 3,
    height: 50,
    paddingRight: 10, paddingLeft: 10,

    paddingTop: 5,
  },
  container: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap"
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
