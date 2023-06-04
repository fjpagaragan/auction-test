import type { Epic as _Epic } from "redux-observable";

import { AlertActions } from "@alert/actions";
import { AlertState } from "./reducer";


export interface State {
  readonly alert: AlertState;
}

export type Epic = _Epic<AlertActions, AlertActions, State>;
