import React from "react"
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { signOutFailure, signOutRequest, signOutSuccess } from "../actions/authenticationActions";
import { Button } from 'react-native-paper';
import firebase from "../config/firebase";

class Settings extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <View>
        <View style={styles.infoBg}>
          <Text style={styles.info}>Message: {this.props.message}</Text>
          <Text style={styles.info}>Pending Auth: {this.props.pendingAuth.toString()}</Text>
          <Text style={styles.info}>userToken: {this.props.userToken}</Text>
        </View>
        <Button
          icon="skull-outline"
          mode="contained"
          color="darkred"
          style={styles.buttonStyle}
          onPress={() => console.log('Delete ALL words')}>
          Delete ALL words
        </Button>

        <Button
          icon="skull"
          mode="contained"
          color="darkred"
          style={styles.buttonStyle}
          onPress={() => console.log('Reset ALL statistics')}>
          Reset ALL statistics
        </Button>

        <Button
          icon="exit-run"
          mode="contained"
          color="darkred"
          style={styles.buttonStyle}
          onPress={() => this.props.handleSignOut()}>
          Sign Out
        </Button>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  infoBg : {
    marginVertical: 30,
    backgroundColor: "lightgrey"
  },
  buttonStyle: {
    marginTop: 10,
    marginHorizontal: 30
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
  handleSignOut: () => {
    dispatch(signOutRequest());
    firebase.auth()
      .signOut()
        .then((res)=>{
          console.log(res);
          dispatch(signOutSuccess(res))
        })
        .catch((err)=> {
          console.log(err);
          dispatch(signOutFailure(err))
        });
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
