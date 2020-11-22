import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from 'react-native-paper';

import { ListItem, InputsWrapper } from "../components";

export default function Words() {
  return (
    <ScrollView>
      <InputsWrapper/>
      <List.Section>
        <List.Accordion
          title="School/University section"
          left={props => <List.Icon {...props} icon="folder" />}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </List.Accordion>
        <List.Accordion
          title="Food section"
          left={props => <List.Icon {...props} icon="folder" />}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
}
