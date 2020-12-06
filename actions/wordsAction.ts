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

const addWordSuccess = (msg: string) =>
  ({
    type: wordsConstants.ADD_WORD_SUCCESS,
    isWordAdding: false,
    msg
  })

const addWordFailure = (err: string) => ({ type: wordsConstants.ADD_WORD_FAILURE, err })


const deleteWordRequest = () => ({ type: wordsConstants.DELETE_WORD_REQUEST })

const deleteWordSuccess = (msg: string) => ({ type: wordsConstants.DELETE_WORD_SUCCESS, msg })

const deleteWordFailure = (err: string) => ({ type: wordsConstants.DELETE_WORD_FAILURE, err })


const getWordsRequest = () => ({ type: wordsConstants.GET_WORDS_REQUEST })

const getWordsSuccess = (words: Word[]) => ({ type: wordsConstants.GET_WORDS_SUCCESS, words })

const getWordsFailure = (err: string) => ({ type: wordsConstants.GET_WORDS_FAILURE, err })

const updateStatsRequest = (successRate : number) => (
  { type: wordsConstants.UPDATE_STATS_REQUEST, successRate })

export {
  addWordRequest, addWordSuccess, addWordFailure,
  deleteWordRequest, deleteWordSuccess, deleteWordFailure,
  getWordsRequest, getWordsSuccess, getWordsFailure,
  updateStatsRequest
}
