import firebase from "../config/firebase";
import React from "react"
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { signInFailure, signInRequest, signInSuccess } from "../actions/authenticationActions";
import { TextInput } from "react-native-paper";
import { Button } from "../components";
import { setForcedOffline } from "../actions/adaptationAction";
import { copyLocalState } from "../actions/wordsAction";

class SignIn extends React.Component {
  constructor(props: any) {
    super(props)
    this.state={
      username: "",
      password: ""
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.enableOfflineMode = this.enableOfflineMode.bind(this);
  }

  enableOfflineMode() {
    this.props.enableOfflineMode(this.props.words)
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
      <View style={{paddingTop: 30}}>
        {/* <View >
          <Text style={styles.info}>Message: {this.props.message}</Text>
          <Text style={styles.info}>Pending Auth: {this.props.pendingAuth.toString()}</Text>
          <Text style={styles.info}>userToken: {this.props.userToken}</Text>
        </View> */}
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
        <Button alignmentStyle={styles.buttonAlignment} buttonTitle="SIGN IN" iconType="sign-direction" fn={this.props.handleSignIn} args={this.state}/>

        <Button alignmentStyle={styles.buttonAlignment} buttonTitle="SIGN UP" iconType="exit-run" fn={ () => this.props.navigation.navigate("SignUp")} args={this.state}/>

        {/* <Button alignmentStyle={styles.buttonAlignment} buttonTitle="I want use app offline" iconType="alien" fn={this.enableOfflineMode} args={this.state}></Button> */}
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

const mapStateToProps = (state: any) => ({
    message: state?.auth?.user?.authMessage,
    pendingAuth: state?.auth?.user?.pendingAuth,
    userToken: state?.auth?.user?.userToken,
    words: state?.words?.words
})

const mapDispatchToProps = (dispatch: Function) => ({
  handleSignIn: (credentials: { username: string, password: string}) => {
    dispatch(signInRequest());
    firebase.auth()
      .signInWithEmailAndPassword(credentials.username, credentials.password)
      .then((res)=>{
        dispatch(signInSuccess(res.user.uid))
        dispatch(setForcedOffline(false))
      })
      .catch((err)=> {
        dispatch(signInFailure(err.toString()))
      });
  },

  enableOfflineMode: (localWords) => {
    dispatch(setForcedOffline(true))
    dispatch(copyLocalState(localWords))
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
