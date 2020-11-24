import wordsConstants from "../contants/wordsConstants"

const wordsReducer = (state = { words: []}, action) => {
  switch (action.type) {
    case wordsConstants.ADD_WORDS_REQUEST:
      return { words: [...state.words, action.word] }
    case wordsConstants.ADD_WORDS_SUCCESS:
      return state
    default:
      return state;
  }
}

export default wordsReducer
