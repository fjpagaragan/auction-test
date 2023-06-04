import { useEffect } from "react";
import { Reducer, Action } from "redux";

import { addReducer, removeReducer } from "@utils/store-reducer";

export const useReducer = <T, U extends Action>(
  key: string,
  reducer: Reducer<T, U>,
): void => {
  useEffect(() => {
    addReducer(key, reducer);
    
    return () => {
      removeReducer(key);
    };
  }, []);
};
