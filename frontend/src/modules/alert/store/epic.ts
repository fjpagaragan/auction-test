import { filter, map } from "rxjs/operators";

import { State, Epic } from "./";
import {
  ResetAlertAction,
  ResetAlertSuccess,
  RESET_ALERT,
  SetAlertAction,
  SetAlertSuccess,
  SET_ALERT,
} from "@alert/actions";
import { AlertState } from "./reducer";


export const selectAlert = (state: State): AlertState => state.alert;

export const setAlertEpic: Epic = (actions$) => {
  return actions$.pipe(
    filter((action): action is SetAlertAction => action.type === SET_ALERT),
    map(({ payload }) => {
      return SetAlertSuccess(payload);
    }),
  );
};

export const resetAlertEpic: Epic = (actions$) => {
  return actions$.pipe(
    filter((action): action is ResetAlertAction => action.type === RESET_ALERT),
    map(() => {
      return ResetAlertSuccess();
    }),
  );
};
