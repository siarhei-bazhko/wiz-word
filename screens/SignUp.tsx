import React from "react"
import { View, Text } from "react-native";
import { connect } from "react-redux";

class SignUp extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>SignUp</Text>
      </View>
    );
  }
}

export default connect(null, null)(SignUp)
