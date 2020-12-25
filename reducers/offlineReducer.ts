import wordsConstants from "../contants/wordsConstants"
import { Word } from "../types/Word"

const initOfflineState =
{ words: [],  successRate: 0, deletedList: [], addedList: [] }

const deleteWord = (id: number, state: any) => (state.words.filter(word => word.refId !== id))

const copyWords = (words: Word[]) => (JSON.parse(JSON.stringify(words)))

const offlineWordsReducer = (state = initOfflineState, action: any) => {
  switch (action.type) {
    case wordsConstants.OFFLINE_ADD_WORD:
      return { ...state,
        words: [...state.words, action.word],
        addedList: [...state.addedList, action.word] };

    case wordsConstants.OFFLINE_GET_WORDS:
      return { ...state };

    case wordsConstants.OFFLINE_DELETE_WORD:
      return { ...state, words: deleteWord(action.id, state) }

    case wordsConstants.COPY_LOCAL_STATE:
      return { ...state, words: copyWords(action.localWords) }

    case wordsConstants.OFFLINE_ADD_TO_DELETED_LIST:
      return { ...state, deletedList: [...state.deletedList, action.id]}

    case wordsConstants.RESET_LISTS:
      return { ...state, deletedList: [], addedList: []}
    default:
      return state;
  }
}

export default offlineWordsReducer
