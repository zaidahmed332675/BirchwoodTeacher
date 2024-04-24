import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import commonSlice from './slices/common.slice';
import userSlice from './slices/user.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const allreducers = combineReducers({
  common: commonSlice,
  user: userSlice,
});

const persistConfig = {
  key: 'birchwoodTeacher',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = (state: any, action: Action) => {
  if (action.type === 'User/resetUserState') {
    state = {};
  }
  return allreducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
