import { createWrapper } from "next-redux-wrapper";
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store as ReduxStore,
  CombinedState,
  Reducer,
} from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

// import { alertReducer } from "@alert/reducers";
import { epicList } from "@store/epics";
// import { userReducer } from "@user/reducers";

interface ReducerManager {
  getReducerMap: () => any;
  reduce: (state: any, action: any) => CombinedState<{ [x: string]: any }>;
  add: (key: string, reducer: Reducer) => void;
  remove: (key: string) => void;
}
interface Store extends ReduxStore {
  reducerManager: ReducerManager;
}

const globalReducers = {
//   alert: alertReducer,
//   user: userReducer,
};

export const createReducerManager = (initialReducers): ReducerManager => {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: string[] = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      // Add the reducer to the reducer mapping
      reducers[key] = reducer;
      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key) => {
      if (!key || !reducers[key]) {
        return;
      }
      // Remove it from the reducer mapping
      delete reducers[key];
      // Add the key to the list of keys to clean up
      keysToRemove.push(key);
      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
};

// Configure the store
const configureStore = (initialState: { [x: string]: any; } | undefined) => {
  const reducerManager = createReducerManager(globalReducers);
  const rootEpic = combineEpics(...epicList);
  const epicMiddleware = createEpicMiddleware();

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = createStore(
    reducerManager.reduce,
    initialState,
    applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(rootEpic);

  // Optional: Put the reducer manager on the store so it is easily accessible
  const storeWithReducerManager: Store = {
    ...store,
    reducerManager,
  };

  return storeWithReducerManager;
};

export const store = configureStore({});
export const wrapper = createWrapper(() => store);
