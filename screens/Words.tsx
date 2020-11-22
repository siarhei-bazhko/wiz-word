import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from 'react-native-paper';

import { ListItem, InputsWrapper } from "../components";

export default class Words extends React.Component {

  constructor(props:any) {
    super(props);
    this.state = {
      words : [
        {
          id: 0,
          origin: "учиться",
          translation: "to study"
        },
        {
          id: 1,
          origin: "универсальность",
          translation: "university"
        },
        {
          id: 2,
          origin: "думать",
          translation: "to think"
        },
        {
          id: 3,
          origin: "красивый",
          translation: "beautiful"
        },
      ]
    };

    this.addWord = this.addWord.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
  }

  addWord(newWordPair: Object) {
    Object.assign(newWordPair, { id: Math.floor(Math.random() * 100000)})
    this.setState((state) => ({
      words: [newWordPair, ...state.words]
    }));
  }

  deleteWord(id: number) {
    console.log(id);
    console.log(this.state.words);

    const words = this.state.words.filter(word => word.id !== id);
    this.setState({
      words
    })
  }

  render() {
    return (
        <ScrollView>
          <InputsWrapper onClick={this.addWord}/>
          <List.Section>
            <List.Accordion
              title="School/University section"
              left={props => <List.Icon {...props} icon="folder" />}>
              {
                this.state.words.map(e => (
                  <ListItem
                   origin={e.origin}
                   translation={e.translation}
                   id={e.id}
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
