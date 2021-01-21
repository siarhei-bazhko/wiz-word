import React from "react";
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';


export default function WordDaily({ dailyWord }) {
  return (
      <Card style={styles.card}>
          {/* <Card.Title title="Word of the day:" style={styles.wordOfTheDay}/> */}

        <Card.Content style={{flexDirection:"column"}}>
        <Text style={styles.wordOfTheDay}>word of the day:</Text>
        <Divider/>
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop: 10}}>
          <View>
            <Title >{dailyWord.translation}</Title>
            <Paragraph style={{fontSize:16}}>{dailyWord.origin}</Paragraph>
          </View>
          <Paragraph style={{fontStyle:"italic"}}>success rate: {
            !dailyWord.totalRuns
            ? 0
            : Math.round(dailyWord.successRuns/dailyWord.totalRuns*100)*100/100
          }%</Paragraph>
        </View>
        </Card.Content>
      </Card>
  );
}


const styles = StyleSheet.create({
  surface: {
  },
  card : {
    flex: 3,
    backgroundColor: "#d5f2e2",
    marginHorizontal:20,
    marginVertical: 20,
    borderRadius: 10
  },
  wordOfTheDay : {
    fontSize: 16,
    fontStyle: "italic"
  }
});
