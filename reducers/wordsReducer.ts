import wordsConstants from "../contants/wordsConstants"


const deleteWord = (id: number, state) => (state.words.filter(word => word.id !== id))


const wordsReducer = (state = { words: []}, action: any) => {
  switch (action.type) {
    case wordsConstants.ADD_WORD_REQUEST:
      return { words: [...state.words, action.word], isWordAdding: action.isWordAdding };

    case wordsConstants.ADD_WORD_SUCCESS:
      return Object.assign(state, { isWordAdding: action.isWordAdding });

    case wordsConstants.DELETE_WORD_REQUEST:
      return { ...state, words: deleteWord(action.id, state), }

    case wordsConstants.UPDATE_STATS_REQUEST:
      return { ...state, successRate: action.successRate };
    default:
      return state;
  }
}

export default wordsReducer
