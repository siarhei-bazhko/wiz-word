import * as React from 'react';
import { StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';

const AddWordInput = ({ label, onChange, word }: any) => {
  return (
    <TextInput
      style={styles.input}
      label={label}
      value={word}
      mode="outlined"
      onChangeText={text => onChange(text)}
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
