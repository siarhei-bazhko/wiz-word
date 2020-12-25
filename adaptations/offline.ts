import { Word } from "../types/Word";
import { store } from "../helpers/reduxStore";
import api, {fs} from "../api/firebase"
import { addToDeletedList, addWordFailure, addWordRequest, addWordSuccess, copyLocalState, deleteWordFailure, deleteWordRequest, deleteWordSuccess, getWordsFailure, getWordsRequest, getWordsSuccess, offlineAddWord, offlineDeleteWord, offlineGetWords } from "../actions/wordsAction";
import { NetworkSituation } from "../types/Adapation";

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
  if(store.getState().situations.isOffline){
    console.log("ADD: You are offline! So Nothing IS stored YET");
    dispatch(offlineAddWord(newWordPair))
    return
  }

  if (!store.getState().situations.isOffline) {
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
    return
  }

  console.log("should be unreachable!!!!!!!!!!!!!!!!!!!!!!!!!");


}

async function deleteFlashcard(dispatch: Function, userToken: string, id: string | number) {

  if(store.getState().situations.isOffline){
    console.log("DELETE: You are offline! So Nothing IS stored YET");
    console.log(id);
    dispatch(offlineDeleteWord(id))
    dispatch(addToDeletedList(id));

    return
  }

  if (!store.getState().situations.isOffline) {
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
  if(store.getState().situations.isOffline){
    console.log("GET:// You are offline! So Nothing IS stored YET");
    dispatch(offlineGetWords());

    return
  }

  if (!store.getState().situations.isOffline) {
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
