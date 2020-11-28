import wordsConstants from "../contants/wordsConstants"

// ----------------
// get words
// add word
// edit word
// delete word
// ----------------

const addWordRequest = (word: any) =>
  ({
    type: wordsConstants.ADD_WORD_REQUEST,
    word,
    isWordAdding: true
  })

const addWordSuccess = () =>
  ({
    type: wordsConstants.ADD_WORD_SUCCESS,
    isWordAdding: false
  })

const addWordFailure = () => ({ type: wordsConstants.ADD_WORD_FAILURE })


const deleteWordRequest = (id: number) => ({ type: wordsConstants.DELETE_WORD_REQUEST, id})

const deleteWordSuccess = () => ({ type: wordsConstants.DELETE_WORD_SUCCESS })

const deleteWordFailure = () => ({ type: wordsConstants.DELETE_WORD_FAILURE })


const getWordsRequest = () => ({ type: wordsConstants.GET_WORDS_REQUEST })

const getWordsSuccess = () => ({ type: wordsConstants.GET_WORDS_SUCCESS })

const getWordsFailure = () => ({ type: wordsConstants.GET_WORDS_FAILURE })

const updateStatsRequest = (successRate : number) => (
  { type: wordsConstants.UPDATE_STATS_REQUEST, successRate })

export {
  addWordRequest, addWordSuccess, addWordFailure,
  deleteWordRequest, deleteWordSuccess, deleteWordFailure,
  getWordsRequest, getWordsSuccess, getWordsFailure,
  updateStatsRequest
}
