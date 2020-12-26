import * as Battery from 'expo-battery';
import * as Network from 'expo-network';

import { store } from "../helpers/reduxStore";
import { setBatterySituation, setForcedOffline, setNetworkSituation, syncFailed } from "../actions/adaptationAction";
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
  checkBatterySituation();
  checkNetworkSituation();
}


async function checkBatterySituation() {
  try {
    const { batteryLevel, batteryState } = await Battery.getPowerStateAsync();
    const prevSituation = store.getState().situations.energy.status;
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

    const lastSyncFailed = store.getState().situations.syncFailed;

    if(prevSituation !== situation || lastSyncFailed) {

      if(situation === BatterySituation.LOW_BATTERY) {
        console.log("LOW battery :: goto offline + disable dictionary api + notify user");
        // forced offline
        const prevForcedOffline = store.getState().situations.energy.forcedOffline;
        if(!prevForcedOffline) {
          store.dispatch(setForcedOffline(true))
          store.dispatch(copyLocalState(store.getState().words.words));
        }
      }


      if(prevSituation === BatterySituation.LOW_BATTERY || lastSyncFailed) {
        console.log("0000000==============000000");
        syncDB()
        store.dispatch(setForcedOffline(false))
      }

      if(situation === BatterySituation.MEDIUM_BATTERY) {
        console.log(" 15 -- 30  situation");

        // TODO: disable dictionary API
        // TODO: decrease sync frequency
      }
      //change situation (last action)
      store.dispatch(setBatterySituation(situation))
    }
  } catch (err) {
    console.log(err);
  }
}

async function checkNetworkSituation() {
  if(store.getState().situations.energy.forcedOffline) {
    return
  }
  try {
    // const isOffline = await Network.isAirplaneModeEnabledAsync();
    const { isInternetReachable: isOnline } = await Network.getNetworkStateAsync();
    const isOffline = !isOnline;
    const prevNetworkState = store.getState().situations.offline.network;
    const prevIsOffline = prevNetworkState === NetworkSituation.OFFLINE ? true : false;

    const lastSyncFailed = store.getState().situations.syncFailed;
    // always change situation on change
    const isSituationChanged = isOffline !== prevIsOffline;
    if(isSituationChanged) {
      const network = isOffline ? NetworkSituation.OFFLINE : NetworkSituation.ONLINE
      // TODO: add server check for avalaibility
      const server = isOffline ? NetworkSituation.SERVER_UNAVALIABLE : NetworkSituation.SERVER_AVALIABLE;

      if(isOffline) {
        // can copy local state
        store.dispatch(copyLocalState(store.getState().words.words));
      }

      if(isOnline || lastSyncFailed) {
        // can sync db
        syncDB()
      }
      //change situation
      store.dispatch(setNetworkSituation({ network, server }))
    }

  } catch (err) {
    console.log(err);
  }
}

async function syncDB() {
  const token = store.getState().auth.user.userToken;
  console.log("Token:" + token);
  if(token === null || token === undefined) {
    store.dispatch(syncFailed(true));
    return
  } else {
    // hack todo : maybe redo
    store.dispatch(syncFailed(false))
  }
  const delBuffer = store.getState().offline.deletedList;
  const addBuffer = store.getState().offline.addedList;
  try {
    await api(token).syncOfflineWithServer(addBuffer, delBuffer);
    store.dispatch(resetLists())
    store.dispatch(getWordsRequest())
    const words: Word[] = await getFlashcards(store.dispatch, token)
    store.dispatch(getWordsSuccess(words));
    return
  } catch(err) {
    console.log("CANT SYNC");
    store.dispatch(getWordsFailure(`adaptation: can't fetch words ${err}`))
    return
  }
}

function notifyUser(notificationType: UserNotification) {

}

export default init;
