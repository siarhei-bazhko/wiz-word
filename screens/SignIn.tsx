import React from "react"
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>SignIn</Text>
        <TextInput
          style={styles.input}
          label={"Username"}
          value={"word"}
          mode="outlined"
          onChangeText={text => onChange(text)}
        />
        <TextInput
          style={styles.input}
          label={"Password"}
          value={"word"}
          mode="outlined"
          onChangeText={text => onChange(text)}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginTop: 10
  }
});

export default connect(null, null)(SignIn)
