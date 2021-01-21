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
    marginHorizontal:15,
    marginVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  wordOfTheDay : {
    fontSize: 16,
    fontStyle: "italic"
  }
});
