import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import auth, { listenToAuthChanges } from './reducers/authSlice';

const rootReduser = combineReducers({
  auth,
});

const setupStore = () => {
  const store = configureStore({
    reducer: rootReduser,
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.dispatch(listenToAuthChanges());
  return store;
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(setupStore);
