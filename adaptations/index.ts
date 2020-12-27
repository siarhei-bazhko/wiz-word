import * as Battery from 'expo-battery';
import * as Network from 'expo-network';

import { store } from "../helpers/reduxStore";
import { isSynchronized, setBatterySituation, setForcedOffline, setNetworkSituation } from "../actions/adaptationAction";
import { BatterySituation, NetworkSituation, UserNotification } from '../types/Adapation';
import {
  copyLocalState,
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
import { getFlashcards } from './proxy';

const CHECK_FREQUENCY = 100;

function init() {
  setInterval(situationChecker, CHECK_FREQUENCY);
}

function situationChecker() {
  checkBatterySituation();
  checkNetworkSituation();
  checkForcedOffline();
}

function checkForcedOffline() {
  const forcedOffline = store.getState().situations.energy.forcedOffline;
  const isSync = store.getState().situations.isSynchronized;
  const token = store.getState().auth.user.userToken;

  if(!forcedOffline && !isSync && token !== null && token !== undefined) {
    //set is_sync:true
    store.dispatch(isSynchronized(true))
    syncDB()
  } else if (forcedOffline) { // we are offline
    //TODO: reduce calls (add in add/delete func)
    //set is_sync: false
    if(isSync === false) {
      return
    }
    store.dispatch(isSynchronized(false))
  } else {
    // if we online and in sync do nothing
  }
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
      // case batteryLevel > 0.15 && batteryLevel <= 0.3:
      //   situation = BatterySituation.MEDIUM_BATTERY
      //   break;
      case batteryLevel <= 0.95:
        situation = BatterySituation.LOW_BATTERY
        break;
      default:
        situation = BatterySituation.GOOD_BATTERY
        break;
      }

    // if(store.getState().situations.energy.forcedOffline) {
    //   return
    // }
    // const lastSyncFailed = store.getState().situations.syncFailed;
    if(prevSituation !== situation) {
      if(situation === BatterySituation.LOW_BATTERY) {
        console.log("Low battery :: goto offline + disable dictionary api + notify user");
        // forced offline
        const prevForcedOffline = store.getState().situations.energy.forcedOffline;
        if(!prevForcedOffline) {
          store.dispatch(setForcedOffline(true))
          store.dispatch(copyLocalState(store.getState().words.words));
        }
      }


      if(prevSituation === BatterySituation.LOW_BATTERY) {
        syncDB()
        store.dispatch(setForcedOffline(false))
      }

      // if(situation === BatterySituation.MEDIUM_BATTERY) {
      //   console.log(" 15 -- 30  situation");

      //   // TODO: disable dictionary API
      //   // TODO: decrease sync frequency
      // }
      //change situation (last action)
      store.dispatch(setBatterySituation(situation))
    }
  } catch (err) {
    console.log(err);
  }
}

async function checkNetworkSituation() {
  // if(store.getState().situations.energy.forcedOffline) {
  //   return
  // }
  try {
    // const isOffline = await Network.isAirplaneModeEnabledAsync();
    const { isInternetReachable: isOnline } = await Network.getNetworkStateAsync();
    const isOffline = !isOnline;
    const prevNetworkState = store.getState().situations.offline.network;
    const prevIsOffline = prevNetworkState === NetworkSituation.OFFLINE ? true : false;

    // const lastSyncFailed = store.getState().situations.syncFailed;
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

      if(isOnline) {
        // can sync db
        syncDB()
        // store.dispatch(setForcedOffline(false))
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
  const forcedOffline = store.getState().situations.energy.forcedOffline;
  if(forcedOffline || token === undefined || token === null) {
    return
  }

  const delBuffer = store.getState().offline.deletedList;
  const addBuffer = store.getState().offline.addedList;
  try {
    store.dispatch(syncOfflineStateWithServerRequest())
    await api(token).syncOfflineWithServer(addBuffer, delBuffer);
    store.dispatch(resetLists())
    store.dispatch(getWordsRequest())
    const words: Word[] = await getFlashcards(store.dispatch, token)
    store.dispatch(getWordsSuccess(words));
    store.dispatch(syncOfflineStateWithServerSuccess())
    return
  } catch(err) {
    console.log("CANT SYNC");
    store.dispatch(syncOfflineStateWithServerFailure())
    store.dispatch(getWordsFailure(`adaptation: can't fetch words ${err}`))
    return
  }
}

function notifyUser(notificationType: UserNotification) {

}

export default init;
