import React, { useEffect } from "react";
import { connect } from "react-redux"
import { ActivityIndicator, Colors, List } from 'react-native-paper';
import type { Word } from "../types/Word";
import { ScrollView } from "react-native";
import InputsWrapper from "../components/Words/InputsWrapper";
import ListItem from "../components/Words/ListItem";
import { deleteFlashcard, getFlashcards } from "../adaptations/proxy";
import { BatterySituation, NetworkSituation } from "../types/Adapation";

type WordsProps = {
  userToken: string,
  words: Word[],
  deleteWord: Function,
  getWords: Function,
}
class Words extends React.Component<WordsProps, Word[]> {

  constructor(readonly props: WordsProps) {
    super(props);
    // this.displayWords = this.displayWords.bind(this);
  }

  componentDidMount() {
    this.props.getWords(this.props.userToken);
  }

  displayWords() {
    if(this.props.words instanceof Array) {
      const words = JSON.parse(JSON.stringify(this.props.words));
      const bestColor = "lightgreen";
      const averageColor = "gold";
      const badColor = "tomato"
      words.map(word => {
        let color = "";
        const success = Math.round(word.successRuns / word.totalRuns * 100)/100;
        if(isNaN(success) || success <= 0.30) {
          color = badColor;
        } else if(success > 0.3 && success < 0.8) {
          color = averageColor
        } else {
          color = bestColor
        }
        return Object.assign(word, { color })
      })
      const green =words.filter(w => w.color === bestColor);
      const yellow =words.filter(w => w.color === averageColor);
      const rest = words.filter(w => w.color !== averageColor && w.color !== bestColor);
      const sorted = [...green, ...yellow, ...rest];
      console.log(sorted);

      return sorted.map((word, index) => (
        <ListItem
          key={index}
          word={word}
          deleteWord={this.props.deleteWord}
          userToken={this.props.userToken}
        />))
    }
    return null
  }

  render() {
    return (
        <ScrollView>
          <InputsWrapper />
          <List.Section>
              <List.Accordion
              title="Add your words in the list!"
              expanded={true}
              style={{margin: 5}}
              left={props => <List.Icon {...props} icon="audiobook" />}>
              { this.props.syncPending ?
                (<ActivityIndicator animating={true} color={Colors.green800} />
                ) : this.displayWords()}
              </List.Accordion>
          </List.Section>
        </ScrollView>
      );
  }
}

const mapStateToProps = (state: any) => {
  // TODO: refactor (ifce)
  const localWords = state?.words?.words ? state.words.words : [];
  const offlineWords = state.offline.words
  const isOffline = state.situations.offline.network === NetworkSituation.OFFLINE
                       || (state.situations.energy.energyOffline && !state.situations.forcedOffline)
  const words = isOffline ? offlineWords : localWords;
  return {
    syncPending: state?.offline?.syncOfflineState,
    userToken: state?.auth?.user?.userToken ? state.auth.user.userToken : null,
    isWordAdding: state?.words?.isWordAdding ? state.words.isWordAdding : false,
    words,
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
