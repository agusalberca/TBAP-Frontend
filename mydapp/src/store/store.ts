import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import saga from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import {
  watchWalletSaga /*announceWalletLoaded*/,
} from '../features/wallet/sagas';
import { EthersWalletAPI } from '../services/Ethers/WalletAPI/EthersWalletAPI';

import RootReducer from './rootReducer';

enableMapSet();

const walletApi = EthersWalletAPI.getInstance();

function* RootSaga() {
  yield all([fork(watchWalletSaga, walletApi)]);
}

const sagaMiddleware = saga();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [], // What you don't wanna to persist
  whitelist: ['wallet'] // What you want to persist
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development',
  
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
