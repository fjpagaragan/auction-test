import type { Reducer } from "redux";

import {
  AlertActions,
  RESET_ALERT_SUCCESS,
  SET_ALERT_SUCCESS,
} from "@alert/actions";
import { AlertDetails } from "@alert/models/view";


export interface AlertState {
  alert?: AlertDetails;
}

const initialState: AlertState = {};

export const alertReducer: Reducer<AlertState, AlertActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_ALERT_SUCCESS:
      return {
        ...state,
        alert: action.payload,
      };

    case RESET_ALERT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

