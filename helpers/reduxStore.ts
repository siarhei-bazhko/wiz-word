import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import { wordsReducer } from "../reducers";

// TODO: make map instead of array


const INIT_STATE = {
  user : {
    userToken: null
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

const store = createStore(wordsReducer, INIT_STATE, applyMiddleware(createLogger()));

export default store;
