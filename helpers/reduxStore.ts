import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";

import { wordsReducer, authReducer, adaptationReducer } from "../reducers";

import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage }  from 'react-native';
import offlineWordsReducer from "../reducers/offlineReducer";

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

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['auth', 'offline']
};

const rootReducer = combineReducers({
   auth: authReducer,
   words: wordsReducer,
   situations: adaptationReducer,
   offline: offlineWordsReducer,
  });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {}, applyMiddleware(createLogger()));
const persistor = persistStore(store);


export {
    persistor,
    store
};
