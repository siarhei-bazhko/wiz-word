import * as React from 'react';
import { StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';

const AddWordInput = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      style={styles.input}
      label="Source word"
      value={text}
      mode="outlined"
      onChangeText={text => setText(text)}
    />
  );
};

export default AddWordInput;

const styles = StyleSheet.create({
  input: {
    flex:10,
    paddingLeft: 10,
    paddingTop: 5
  }
});
