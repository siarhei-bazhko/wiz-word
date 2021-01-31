import React from "react"
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { signOutFailure, signOutRequest, signOutSuccess } from "../actions/authenticationActions";
import { Button } from 'react-native-paper';
import firebase from "../config/firebase";
import { setForcedOffline } from "../actions/adaptationAction";
import { copyLocalState } from "../actions/wordsAction";
import { NetworkSituation } from "../types/Adapation";
import { store } from "../helpers";
import api from "../api/firebase"

class Settings extends React.Component {
  constructor(props: any) {
    super(props)

    this.enableOfflineMode = this.enableOfflineMode.bind(this)
    this.disableOfflineMode = this.disableOfflineMode.bind(this)
  }

  enableOfflineMode() {
    this.props.enableOfflineMode(this.props.words)
  }

  disableOfflineMode() {
    this.props.disableOfflineMode(this.props.words)
  }

  handleSignOut() {
    this.props.handleSignOut(this.props.words)
    const token = store.getState().auth.user.userToken;
    api(token).signOut();
  }

  render() {
    return (
      <View style={{paddingTop: 30}}>
        {/* <View style={styles.infoBg}>
          <Text style={styles.info}>Message: {this.props.message instanceof String ? this.props.message : '-'}</Text>
          <Text style={styles.info}>Pending Auth: {this.props.pendingAuth.toString()}</Text>
          <Text style={styles.info}>userToken: {this.props?.userToken ? this.props.userToken : '-'}</Text>
        </View> */}
        <Button
          icon="skull-outline"
          mode="contained"
          color="darkred"
          style={styles.buttonStyle}
          disabled={true}
          onPress={() => console.log('Delete ALL words')}>
          Delete ALL words
        </Button>

        <Button
          icon="skull"
          mode="contained"
          color="darkred"
          style={styles.buttonStyle}
          disabled={true}
          onPress={() => console.log('Reset ALL statistics')}>
          Reset ALL statistics
        </Button>

        <Button
          icon="exit-run"
          mode="contained"
          color="darkred"
          style={styles.buttonStyle}
          disabled={this.props.isOffline}
          onPress={() => this.handleSignOut()}>
          Sign Out
        </Button>
      <View>
        <Text style={{textAlign:"center", marginTop: 50, fontSize: 16, fontStyle:"italic"}}>Experimental features</Text>
        <Button
          icon="google-earth"
          mode="contained"
          color="green"
          style={styles.onlineButtonStyle}
          onPress={() => this.disableOfflineMode()}>
          Not ignore energy
        </Button>

        <Button
          icon="alien"
          mode="contained"
          color="red"
          style={styles.offlineButtonStyle}
          onPress={() => {this.enableOfflineMode()}}>
          Ingore energy
        </Button>
      </View>
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

  onlineButtonStyle: {
    marginTop: 10,
    marginHorizontal: 30
  },

  offlineButtonStyle: {
    marginTop: 10,
    marginHorizontal: 30
  },

  info: {
    fontSize: 16,
    color: 'red'
  }
});

const mapStateToProps = (state: any) => {
    // TODO: refactor (ifce)
  const localWords = state?.words?.words ? state.words.words : [];
  const offlineWords = state.offline.words
  const isOffline = state.situations.offline.network === NetworkSituation.OFFLINE
                       || (state.situations.energy.energyOffline && !state.situations.forcedOffline)
  const words = isOffline ? offlineWords : localWords;
  return {
    message: state?.auth?.user?.authMessage,
    pendingAuth: state?.auth?.user?.pendingAuth,
    userToken: state?.auth?.user?.userToken,
    words,
    isOffline

}
}

const mapDispatchToProps = (dispatch: Function) => ({
  handleSignOut: (localWords) => {
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
    // dispatch(setForcedOffline(true))
    // dispatch(copyLocalState(localWords))
    // store.getState().offline.words = []
  },

  disableOfflineMode: (localWords) => {
    dispatch(setForcedOffline(false))
    dispatch(copyLocalState(localWords))
  },

  enableOfflineMode: (localWords) => {
    // dispatch(setForcedOffline(true))
    dispatch(copyLocalState(localWords))
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
