import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import { persistStore, persistReducer, } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import logger from 'redux-logger';

const persistConfig = {
  key: "root",
  storage: storageSession,
  //blacklist:['openvidu'],
}


const perReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [logger]

export const store = configureStore({
  reducer: perReducer,
  // middleware: middlewares

  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
    middlewares
    // serializableCheck: {
    // ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // ovActions: false,
    // },
  }),
});

const setUpStore = (context) => store;
const makeStore = (context) => setUpStore(context);

export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);