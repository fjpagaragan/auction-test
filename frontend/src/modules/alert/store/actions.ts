import type { Action, ActionCreator } from "redux";
import { AlertDetails } from "@alert/models/view";

export const SET_ALERT = "SET_ALERT";
export const SET_ALERT_SUCCESS = "SET_ALERT_SUCCESS";
export const RESET_ALERT = "RESET_ALERT";
export const RESET_ALERT_SUCCESS = "RESET_ALERT_SUCCESS";

export type AlertActions =
  | SetAlertAction
  | SetAlertSuccessAction
  | ResetAlertAction
  | ResetAlertSuccessAction;

export interface SetAlertAction extends Action {
  type: typeof SET_ALERT;
  payload: AlertDetails;
}

export interface SetAlertSuccessAction extends Action {
  type: typeof SET_ALERT_SUCCESS;
  payload: AlertDetails;
}

export interface ResetAlertAction extends Action {
  type: typeof RESET_ALERT;
}

export interface ResetAlertSuccessAction extends Action {
  type: typeof RESET_ALERT_SUCCESS;
}

export const SetAlert: ActionCreator<SetAlertAction> = (
  payload: AlertDetails,
) => ({
  type: SET_ALERT,
  payload,
});

export const SetAlertSuccess: ActionCreator<SetAlertSuccessAction> = (
  payload: AlertDetails,
) => ({
  type: SET_ALERT_SUCCESS,
  payload,
});

export const ResetAlert: ActionCreator<ResetAlertAction> = () => ({
  type: RESET_ALERT,
});

export const ResetAlertSuccess: ActionCreator<
  ResetAlertSuccessAction
> = () => ({
  type: RESET_ALERT_SUCCESS,
});
