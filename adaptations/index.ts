import * as Battery from 'expo-battery';
import * as Network from 'expo-network';

import { store } from "../helpers/reduxStore";
import { setBatterySituation, setNetworkSituation } from "../actions/adaptationAction";
import { BatterySituation, NetworkSituation, UserNotification } from '../types/Adapation';
import { copyLocalState,
  syncOfflineStateWithServerRequest,
  syncOfflineStateWithServerSuccess,
  syncOfflineStateWithServerFailure,
  resetLists,
  getWordsRequest,
  getWordsSuccess,
  getWordsFailure
} from '../actions/wordsAction';
import { Word } from '../types/Word';
import api from '../api/firebase';
import { getFlashcards } from '../adaptations/offline';

const CHECK_FREQUENCY = 100;

function init() {
  setInterval(situationChecker, CHECK_FREQUENCY);
}

function situationChecker() {
  // checkBatterySituation();
  checkNetworkSituation();
}


async function checkBatterySituation() {
  try {
    const { batteryLevel, batteryState } = await Battery.getPowerStateAsync();
    let situation = BatterySituation.CHARGING;
    switch (true) {
      case batteryState === Battery.BatteryState.CHARGING:
        situation = BatterySituation.CHARGING
        break;
      case batteryLevel > 0.15 && batteryLevel <= 0.3:
        situation = BatterySituation.MEDIUM_BATTERY
        break;
      case batteryLevel <= 0.15:
        situation = BatterySituation.LOW_BATTERY
        break;
      default:
        situation = BatterySituation.GOOD_BATTERY
        break;
    }
    store.dispatch(setBatterySituation(situation))
  } catch (err) {
    console.log(err);
  }
}

async function checkNetworkSituation() {


  try {
    // const isOffline = await Network.isAirplaneModeEnabledAsync();
    const { isInternetReachable: isOnline } = await Network.getNetworkStateAsync();
    const isOffline = !isOnline;
    const prevNetworkState = store.getState().situations.offline.network;
    const prevIsOffline = prevNetworkState === NetworkSituation.OFFLINE ? true : false;
    // always change situation on change
    if(isOffline !== prevIsOffline) {
      console.log("++++++++++++++++++++++");

      console.log(prevIsOffline, isOffline);

      console.log("++++++++++++++++++++++");
      const network = isOffline ? NetworkSituation.OFFLINE : NetworkSituation.ONLINE
      // TODO: add server check for avalaibility
      const server = isOffline ? NetworkSituation.SERVER_UNAVALIABLE : NetworkSituation.SERVER_AVALIABLE;
      store.dispatch(setNetworkSituation({ network, server }))
    }

    if(isOffline) {
      notifyUser(UserNotification.INTERNET_UNREACHABLE)
      notifyUser(UserNotification.LIMITED_FUNCTIONALITY)

      const canCopyLocalState = isOffline !== prevIsOffline;

      if(canCopyLocalState) {
        store.dispatch(copyLocalState(store.getState().words.words));
      }
    }

    if(isOnline) {
      const canSyncDB = isOffline !== prevIsOffline;
      if(canSyncDB) {
        syncDB()
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function syncDB() {
  const token = store.getState().auth.user.userToken;
  const delBuffer = store.getState().offline.deletedList;
  const addBuffer = store.getState().offline.addedList;
  try {
    await api(token).syncOfflineWithServer(addBuffer, delBuffer);
    store.dispatch(resetLists())
    store.dispatch(getWordsRequest())
    const words: Word[] = await getFlashcards(store.dispatch, token)
    store.dispatch(getWordsSuccess(words));
  } catch(err) {
    console.log("CANT SYNC");
    store.dispatch(getWordsFailure(`adaptation: can't fetch words ${err}`))
  }
}

function notifyUser(notificationType: UserNotification) {

}

export default init;
