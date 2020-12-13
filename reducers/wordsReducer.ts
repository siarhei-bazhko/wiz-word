import wordsConstants from "../contants/wordsConstants"

const initState = { words: [], isWordsFetching: false, isWordAdding: false, msg: "",  successRate: 0 }
const wordsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case wordsConstants.ADD_WORD_REQUEST:
      return { ...state, isWordAdding: action.isWordAdding };

    case wordsConstants.ADD_WORD_SUCCESS:
      return { ...state, isWordAdding: action.isWordAdding, message: action.msg };

    case wordsConstants.ADD_WORD_FAILURE:
      return { ...state, isWordAdding: action.isWordAdding, message: action.err };

    case wordsConstants.GET_WORDS_REQUEST:
      // TODO: add to action
      return { ...state, isWordsFetching: true };

    case wordsConstants.GET_WORDS_SUCCESS:
      // TODO: add to action isWordsFetching
      return { ...state, words: action.words, isWordsFetching: false };

    case wordsConstants.GET_WORDS_FAILURE:
      // TODO: add to action isWordsFetching
      return { ...state, isWordsFetching: false, msg: action.err };

    case wordsConstants.DELETE_WORD_REQUEST:
      return { ...state, msg: action.msg }

    case wordsConstants.DELETE_WORD_SUCCESS:
      return { ...state, msg: action.msg }

    case wordsConstants.DELETE_WORD_FAILURE:
      return { ...state, msg: action.err }

    default:
      return state;
  }
}

export default wordsReducer
