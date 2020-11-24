import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import { wordsReducer } from "../reducers";

const INIT_STATE = {
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
      ]
}

const store = createStore(wordsReducer, INIT_STATE, applyMiddleware(createLogger()));
console.log(store.getState())

export default store;
