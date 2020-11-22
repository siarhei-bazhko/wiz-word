import React from "react";
import { Surface, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';


export default function WordDaily() {
  return (
      <Card style={styles.card}>
          <Card.Title title="Word of the day:" />
        <Card.Content >
          <Title >To Work</Title>
          <Paragraph >Работать</Paragraph>
        </Card.Content>
      </Card>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
  },
  card : {
    flex: 3,
    backgroundColor: "#d5f2e2",
  }
});
