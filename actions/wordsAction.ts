import wordsConstants from "../contants/wordsConstants"

// ----------------
// get words
// add word
// edit word
// delete word
// ----------------

const addWordRequest = (word) => ({ type: wordsConstants.ADD_WORDS_REQUEST, word})

const addWordSuccess = () => ({ type: wordsConstants.ADD_WORDS_SUCCESS })

const addWordFailure = () => ({ type: wordsConstants. ADD_WORDS_FAILURE })


const getWordsRequest = () => ({ type: wordsConstants.GET_WORDS_REQUEST })

const getWordsSuccess = () => ({ type: wordsConstants.GET_WORDS_SUCCESS })

const getWordsFailure = () => ({ type: wordsConstants.GET_WORDS_FAILURE })

export {
  addWordRequest, addWordSuccess, addWordFailure,
  getWordsRequest, getWordsSuccess, getWordsFailure
}
