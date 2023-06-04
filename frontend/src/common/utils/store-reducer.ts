import { Reducer, Action } from "redux";

import { store } from "@store/index";

export const addReducer = <T, U extends Action>(
  key: string,
  reducer: Reducer<T, U>,
): void => {
  store.reducerManager.add(key, reducer);
};

export const removeReducer = (key: string): void => {
  store.reducerManager.remove(key);
};
