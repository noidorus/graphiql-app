import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import auth, { listenToAuthChanges } from './reducers/authSlice';

const rootReduser = combineReducers({
  auth,
});

const getInitState = () => {
  let initState: { uid: string } | undefined;
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('auth') || JSON.stringify({ uid: null });
    initState = JSON.parse(data) as { uid: string };
  } else {
    initState = undefined;
  }

  return initState;
};

const setupStore = () => {
  const initialState = getInitState();
  console.log(initialState);

  const store = initialState
    ? configureStore({
        reducer: rootReduser,
        preloadedState: {
          auth: {
            userId: initialState.uid,
          },
        },
        devTools: process.env.NODE_ENV !== 'production',
      })
    : configureStore({
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
