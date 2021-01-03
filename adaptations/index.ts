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
  situationChecker()
}

function situationChecker() {
  setTimeout(async () => {
    await checkBatterySituation();
    await checkNetworkSituation();
    await checkForcedOffline();

    situationChecker();
  }, CHECK_FREQUENCY)
}

async function checkForcedOffline() {
  const forcedOffline = store.getState().situations.energy.forcedOffline;
  const isSync = store.getState().situations.isSynchronized;
  const token = store.getState().auth.user.userToken;

  if(!forcedOffline && !isSync && token !== null && token !== undefined) {
    //set is_sync:true
    store.dispatch(isSynchronized(true))
    await syncDB()
  } else if (forcedOffline) { // we are offline
    //TODO: reduce calls (add in add/delete func)
    //set is_sync: false
    if(!isSync) {
      return
    }
    store.dispatch(isSynchronized(false))
  } else {
    // if we online and in sync do nothing
  }
}

async function checkBatterySituation() {
  if(store.getState().situations.offline.network === NetworkSituation.OFFLINE) {
    return
  }
  try {
    const { batteryLevel, batteryState } = await Battery.getPowerStateAsync();
    const prevSituation = store.getState().situations.energy.status;
    const prevForcedOffline = store.getState().situations.energy.forcedOffline;
    let situation = BatterySituation.CHARGING;
    switch (true) {
      case batteryState === Battery.BatteryState.CHARGING:
        situation = BatterySituation.CHARGING
        break;
      case batteryLevel > 0.2 && batteryLevel <= 0.50:
        situation = BatterySituation.MEDIUM_BATTERY
        // TODO: disable dictionary API
        // TODO: decrease sync frequency
        if(!prevForcedOffline) {
          store.dispatch(setForcedOffline(true))
          store.dispatch(copyLocalState(store.getState().words.words));
        }
        // count # of actions we will "buffer" (# of add and delete)
        const addArrayLength = store.getState().offline.addedList.length;
        const deletedArrayLength = store.getState().offline.deletedList.length;
        // when # > threshold (5) => go online again
        if(addArrayLength + deletedArrayLength >= 5) {
          // bad hack :(
          await syncDB()
          store.dispatch(setForcedOffline(false))
        }
        break;
      case batteryLevel <= 0.2:
        situation = BatterySituation.LOW_BATTERY
        if(!prevForcedOffline) {
          store.dispatch(setForcedOffline(true))
          store.dispatch(copyLocalState(store.getState().words.words));
        }
        break;
      default:
        situation = BatterySituation.GOOD_BATTERY
        break;
    }

    if(prevSituation !== situation) {
      if(prevSituation === BatterySituation.LOW_BATTERY || prevSituation === BatterySituation.MEDIUM_BATTERY) {
        await syncDB()
        store.dispatch(setForcedOffline(false))
      }
      //change situation (last action)
      store.dispatch(setBatterySituation(situation))
    }
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
    const isSituationChanged = isOffline !== prevIsOffline;
    if(isSituationChanged) {
      const network = isOffline ? NetworkSituation.OFFLINE : NetworkSituation.ONLINE
      // TODO: add server check for avalaibility
      const server = isOffline ? NetworkSituation.SERVER_UNAVALIABLE : NetworkSituation.SERVER_AVALIABLE;

      if(isOffline) {
        store.dispatch(copyLocalState(store.getState().words.words));
      }

      if(isOnline) {
        await syncDB()
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
  } catch(err) {
    console.log("CANT SYNC");
    store.dispatch(syncOfflineStateWithServerFailure())
    store.dispatch(getWordsFailure(`adaptation: can't fetch words ${err}`))
  }
}

function notifyUser(notificationType: UserNotification) {

}

export default init;
