import { Word } from "../types/Word";
import { store } from "../helpers/reduxStore";
import { BatterySituation } from "../types/Adapation";
import api, {fs} from "../api/firebase"
import { setSyncReady } from "../actions/adaptationAction";

interface ProxyAPI {
  // authentication
  signIn(credentials: {}): void;
  signUp(credentials: {}): void;
  signOut(): void;

  // storage
  addFlashcard(userToken: string, flashcard: Word) : void
  deleteFlashcard(userToken: string, id: number): void
  getFlashcards(userToken: string): void
}

function addFlashcard(userToken: string, flashcard: Word): void {
  if(store.getState().situations.energy.situation === BatterySituation.MEDIUM_BATTERY) {
    console.log("Sync Frequency is Decreased:: Use batch requests up to 10");

    console.log("Translation API Disabled");
    console.log("User is notified");

  }
}

function deleteFlashcard() {
  if(store.getState().situations.energy.situation === BatterySituation.MEDIUM_BATTERY) {
    console.log("Sync Frequency is Decreased:: Use batch requests up to 10");

    console.log("Translation API Disabled");
    console.log("User is notified");
  }
}

function getFlashcards(userToken : string) {
    // const isAdaptationOn = store.getState().situations.isAdaptationOn;
    // if(store.getState().situations.energy.situation === BatterySituation.MEDIUM_BATTERY) {
    //   if(!isAdaptationOn) {
    //     await fs.disableNetwork();
    //   }
    //   const readyToSync = store.getState().situations.energy.readyToSync;
    //   store.dispatch(setSyncReady(!readyToSync, isAdaptationOn));
    //   if(readyToSync) {
      api(userToken).getFlashcards();
      // }
      // console.log("Sync Frequency is Decreased:: Use batch requests up to 10");
      // console.log("Translation API Disabled");
      // console.log("User is notified");
      // return
    // }

  // if(store.getState().situations.energy.situation === BatterySituation.LOW_BATTERY) {
  //   await fs.disableNetwork();
  //   return
  // }

  // await fs.enableNetwork();
  // store.dispatch(setSyncReady(true, false))
}


export {
  getFlashcards
}
