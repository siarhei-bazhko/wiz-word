import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";

import { wordsReducer, authReducer } from "../reducers";

const INIT_STATE = {
  user : {
    userToken: null,
    authMessage: ""
  },
  words : [
        {
          id: 0,
          origin: "учиться",
          translation: "to study"
        },
        {
          id: 1,
          origin: "универсальность",
          translation: "university"
        },
        {
          id: 2,
          origin: "думать",
          translation: "to think"
        },
        {
          id: 3,
          origin: "красивый",
          translation: "beautiful"
        },
      ],
  isWordAdding: false,
  successRate: 0
}

const store = createStore(combineReducers({  auth: authReducer, words: wordsReducer }), {}, applyMiddleware(createLogger()));

export default store;
