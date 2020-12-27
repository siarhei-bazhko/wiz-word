import wordsConstants from "../contants/wordsConstants"
import { Word } from "../types/Word"

// ----------------
// get words
// add word
// edit word
// delete word
// ----------------

const addWordRequest = () =>
  ({
    type: wordsConstants.ADD_WORD_REQUEST,
    isWordAdding: true
  })

const addWordSuccess = (msg: string, newWord: any) =>
  ({
    type: wordsConstants.ADD_WORD_SUCCESS,
    isWordAdding: false,
    msg,
    newWord
  })

const addWordFailure = (err: string) => ({ type: wordsConstants.ADD_WORD_FAILURE, err })


const deleteWordRequest = () => ({ type: wordsConstants.DELETE_WORD_REQUEST })

const deleteWordSuccess = (msg: string) => ({ type: wordsConstants.DELETE_WORD_SUCCESS, msg })

const deleteWordFailure = (err: string) => ({ type: wordsConstants.DELETE_WORD_FAILURE, err })


const getWordsRequest = () => ({ type: wordsConstants.GET_WORDS_REQUEST })

const getWordsSuccess = (words: Word[]) => ({ type: wordsConstants.GET_WORDS_SUCCESS, words })

const getWordsFailure = (err: string) => ({ type: wordsConstants.GET_WORDS_FAILURE, err })

const updateStatsRequest = (successRate : number) => ({ type: wordsConstants.UPDATE_STATS_REQUEST, successRate })


const offlineAddWord = (word: Word) => ({
  type: wordsConstants.OFFLINE_ADD_WORD,
  word,
})

const offlineGetWords = () => ({
  type: wordsConstants.OFFLINE_GET_WORDS,
})

const offlineDeleteWord = (id: string) => ({
  type: wordsConstants.OFFLINE_DELETE_WORD,
  id
})

const offlineUpdateStatsRequest = (successRate : number) => ({
  type: wordsConstants.OFFLINE_UPDATE_STATS_REQUEST,
  successRate
})

const copyLocalState = (localWords: Word[]) => ({
  type: wordsConstants.COPY_LOCAL_STATE,
  localWords
})

const syncOfflineStateWithServerRequest = () => ({
  type: wordsConstants.SYNC_OFFLINE_STATE_REQUEST,
  syncOfflineState: true,
})

const syncOfflineStateWithServerSuccess = () => ({
  type: wordsConstants.SYNC_OFFLINE_STATE_SUCCESS,
  syncOfflineState: false,

})

const syncOfflineStateWithServerFailure = () => ({
  type: wordsConstants.SYNC_OFFLINE_STATE_FAILURE,
  syncOfflineState: false,
})

const addToDeletedList = (id: string) => ({
  type: wordsConstants.OFFLINE_ADD_TO_DELETED_LIST,
  id
})

const addToAddedList = (word: Word) => ({
  type: wordsConstants.OFFLINE_ADD_TO_ADDED_LIST,
  word
})

const resetLists = () => ({
  type: wordsConstants.RESET_LISTS,
});

export {
  addWordRequest, addWordSuccess, addWordFailure,
  deleteWordRequest, deleteWordSuccess, deleteWordFailure,
  getWordsRequest, getWordsSuccess, getWordsFailure,
  updateStatsRequest,

  offlineAddWord,
  offlineGetWords,
  offlineDeleteWord,
  offlineUpdateStatsRequest,

  
  copyLocalState,
  syncOfflineStateWithServerRequest,
  syncOfflineStateWithServerSuccess,
  syncOfflineStateWithServerFailure,

  addToDeletedList,
  addToAddedList,
  resetLists
}
