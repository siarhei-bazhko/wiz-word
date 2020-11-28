import React from "react";
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';


export default function WordDaily({ dailyWord }) {
  return (
      <Card style={styles.card}>
          <Card.Title title="Word of the day:" />
        <Card.Content >
          <Title >{dailyWord.translation}</Title>
          <Paragraph >{dailyWord.origin}</Paragraph>
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
