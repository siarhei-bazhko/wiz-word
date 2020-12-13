import React from "react"
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { signUpFailure, signUpRequest, signUpSuccess } from "../actions/authenticationActions";
import { Button } from "../components";
import firebase from "../config/firebase";

class SignUp extends React.Component {
  constructor(props: any) {
    super(props)
    this.state={
      username: "",
      password: ""
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(username: string) {
    this.setState({
      username
    })
  }

  handlePassword(password: string) {
    this.setState({
      password
    })
  }

  render() {
    return (
      <View>
        <View >
          <Text style={styles.info}>Message: {this.props.message}</Text>
          <Text style={styles.info}>Pending Auth: {this.props.pendingAuth.toString()}</Text>
          <Text style={styles.info}>userToken: {this.props.userToken}</Text>
        </View>
        <TextInput
          style={styles.input}
          label={"Username"}
          mode="outlined"
          onChangeText={text => this.handleUsername(text)}
        />
        <TextInput
          style={styles.input}
          label={"Password"}
          mode="outlined"
          onChangeText={text => this.handlePassword(text)}
        />
        <Button alignmentStyle={styles.buttonAlignment} buttonTitle="Register" iconType="mail" fn={this.props.handleSignUp} args={this.state}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginTop: 10
  },
  buttonAlignment: {
    marginTop: 10
  },
  info: {
    fontSize: 16,
    color: 'red'
  }
});

const mapStateToProps = ({auth}: any) => ({
    message: auth?.user?.authMessage,
    pendingAuth: auth?.user?.pendingAuth,
    userToken: auth?.user?.userToken
})

const mapDispatchToProps = (dispatch: Function) => ({
  handleSignUp: (credentials: { username: string, password: string}) => {
    dispatch(signUpRequest());
    firebase.auth()
      .createUserWithEmailAndPassword(credentials.username, credentials.password)
      .then((res)=>{
        dispatch(signUpSuccess(res.user.uid))
      })
      .catch((err)=> {
        dispatch(signUpFailure(err))
      });
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
