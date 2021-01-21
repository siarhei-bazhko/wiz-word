import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";

import { wordsReducer, authReducer, adaptationReducer } from "../reducers";

import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage }  from 'react-native';
import offlineWordsReducer from "../reducers/offlineReducer";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['auth', 'offline', 'situations']
};

const rootReducer = combineReducers({
   auth: authReducer,
   words: wordsReducer,
   situations: adaptationReducer,
   offline: offlineWordsReducer,
  });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {});
const persistor = persistStore(store);


export {
    persistor,
    store
};
