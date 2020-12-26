import { Word } from "../types/Word";
import { store } from "../helpers/reduxStore";
import api, {fs} from "../api/firebase"
import { addToDeletedList, addWordFailure, addWordRequest, addWordSuccess, copyLocalState, deleteWordFailure, deleteWordRequest, deleteWordSuccess, getWordsFailure, getWordsRequest, getWordsSuccess, offlineAddWord, offlineDeleteWord, offlineGetWords } from "../actions/wordsAction";
import { BatterySituation, NetworkSituation } from "../types/Adapation";

// interface ProxyAPI {
  // authentication
  // signIn(credentials: {}): void;
  // signUp(credentials: {}): void;
  // signOut(): void;

  // storage
  // addFlashcard(userToken: string, flashcard: Word) : void
  // deleteFlashcard(userToken: string, id: number): void
  // getFlashcards(userToken: string): void
// }

function addFlashcard(dispatch: Function, userToken: string, newWordPair: Word) {
  const network = store.getState().situations.offline.network;
  const energy = store.getState().situations.energy.status;

  if(network === NetworkSituation.OFFLINE || energy === BatterySituation.LOW_BATTERY){
    console.log("ADD: You are offline! So Nothing IS stored YET");
    dispatch(offlineAddWord(newWordPair))
    return
  }

  if (network === NetworkSituation.ONLINE) {
    const call = api(userToken);
    addWordRequest();
    call.addFlashcard(newWordPair)
    .then(res => {
      dispatch(addWordSuccess(res.msg, {}));
    })
    .catch(err => {
      dispatch(addWordFailure(err.msg));
    })
    .then(() => {
      dispatch(getWordsRequest());
      return api(userToken).getFlashcards();
    })
    .then(flashcards => {
      dispatch(getWordsSuccess(flashcards));
    })
    .catch(err => {
      dispatch(getWordsFailure(err.msg));
    });
  }
}

async function deleteFlashcard(dispatch: Function, userToken: string, id: string | number) {
  const network = store.getState().situations.offline.network;
  const energy = store.getState().situations.energy.status;

  if(network === NetworkSituation.OFFLINE || energy === BatterySituation.LOW_BATTERY){
    console.log("DELETE: You are offline! So Nothing IS stored YET");
    console.log(id);
    dispatch(offlineDeleteWord(id))
    dispatch(addToDeletedList(id));

    return
  }

  if (network === NetworkSituation.ONLINE) {
  const call = api(userToken);
    dispatch(deleteWordRequest());
    try {
      const res = await call.deleteFlashcard(id)
      dispatch(deleteWordSuccess(res.msg));
    } catch (err) {
      dispatch(deleteWordFailure(err.msg))
    }

    try {
      dispatch(getWordsRequest());
      const flashcards = await call.getFlashcards();
      dispatch(getWordsSuccess(flashcards));
    } catch (err) {
      dispatch(getWordsFailure(err.msg));
    }
  }
}

function getFlashcards(dispatch: Function, userToken : string) {
  const network = store.getState().situations.offline.network;
  const energy = store.getState().situations.energy.status;

  if(network === NetworkSituation.OFFLINE || energy === BatterySituation.LOW_BATTERY){
    console.log("GET:// You are offline! So Nothing IS stored YET");
    dispatch(offlineGetWords());
    return
  }

  if (network === NetworkSituation.ONLINE) {
    const call = api(userToken);
    dispatch(getWordsRequest());
    call.getFlashcards()
      .then(flashcards => { dispatch(getWordsSuccess(flashcards)); })
      .catch(err => { dispatch(getWordsFailure(err.msg));});
    return
  }
}


export {
  addFlashcard,
  getFlashcards,
  deleteFlashcard
}
