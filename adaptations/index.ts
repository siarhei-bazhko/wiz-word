import * as Battery from 'expo-battery';
import * as Network from 'expo-network';

import { store } from "../helpers/reduxStore";
import { setBatterySituation, setNetworkSituation } from "../actions/adaptationAction";
import { BatterySituation } from '../types/Adapation';
import { copyLocalState,
  syncOfflineStateWithServerRequest,
  syncOfflineStateWithServerSuccess,
  syncOfflineStateWithServerFailure,
  resetList,
  resetLists,
  getWordsRequest,
  getWordsSuccess
} from '../actions/wordsAction';
import { storage } from 'firebase';
import { Word } from '../types/Word';
import api from '../api/firebase';
import { getFlashcards } from './offline';

const CHECK_FREQUENCY = 100;

function init() {
  setInterval(situationChecker, CHECK_FREQUENCY);
}

function situationChecker() {
  // checkBatterySituation();
  checkNetworkSituation();
  // switch (true) {
  //   /** Energy checks */
  //   case await isBatteryInRange(0, 15):
  //     console.log("Battery is 0 - 15 %");
  //   case isBatteryInRange(15, 30):
  //     console.log("Battery is 15 - 30 %");
  //     default:
  //     console.log("Battery is > 30%");
  // }

  // switch(true) {
  //   /** Offline checks */
  //   case isNetworkAvaliable():
  //     console.log("Firebase is Avaliable SUPER!!!");
  //     break;
  //   case isDeviceOffline():
  //     console.log("Device is offline");
  //     isAirPlaneOn();
  //     console.log("Please turn off AirPlaneMode");
  //     isWifiOff();
  //     console.log("Please turn on Wifi");
  //     isMobileOff();
  //     console.log("Please turn on (Mobile) Internet");
  //     break;
  //   default:
  //     console.log("Seems like this is unreachable statement");
  //     break;
  // }
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
    const isOffline = await Network.isAirplaneModeEnabledAsync()
    // console.log("==========================");
    // console.log("new: "+isOffline);
    // console.log("old:"+ store.getState().situations.isOffline);
    // console.log("==========================");

    const prevIsOffline= store.getState().situations.isOffline;
    const canCopyLocalState = isOffline && (isOffline !== prevIsOffline);
    const canSyncDB = !isOffline && (isOffline !== prevIsOffline);

    if(isOffline !== prevIsOffline) {
      store.dispatch(setNetworkSituation(isOffline));
    }

    if(canCopyLocalState) {
      store.dispatch(copyLocalState(store.getState().words.words));
    }

    if(canSyncDB) {
      const dbState = store.getState().words.words;
      const offlineState = store.getState().offline.words;
      // const mergedState = mergeStates(dbState, offlineState);
      // console.log(`TRY TO SYNC ${mergedState.length}` + JSON.stringify(mergedState));
      // push all offline state to db
      // store.dispatch(syncOfflineStateWithServerRequest())
      const token = store.getState().auth.user.userToken;
      const delBuffer = store.getState().offline.deletedList;
      const addBuffer = store.getState().offline.addedList;
      try {
        await api(token).syncOfflineWithServer(addBuffer, delBuffer);
        store.dispatch(resetLists())
        store.dispatch(getWordsRequest())
        const words = await getFlashcards(store.dispatch, token)
        store.dispatch(getWordsSuccess(words));
      } catch(err) {
        console.log("CANT SYNC");
      }
      // store.dispatch(syncState(mergedState))
    }

  } catch (err) {
    console.log(err);
  }
}

function mergeStates(dbState: Word[], offlineState: Word[]) {
  const mergedState: Word[] = JSON.parse(JSON.stringify(offlineState));
  // TODO: redo merge (maybe)
  // dbState.forEach((dbWord: Word) => {
  //   offlineState.forEach((offlineWord: Word) => {
  //     // if there are any words in dbState that are not in offlineState
  //     // we consider them as deleted
  //     // vise versa: all new words in offline state are added to dbState

  //   })})
    return mergedState;
}

export default init;
