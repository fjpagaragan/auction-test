import { AlertDetails } from "@alert/models/view";
import { AlertStatus, DEFAULT_TIMEOUT } from "@alert/utils/constants";

export const getDismissibleAlertDetails = (
  message: string,
  status: AlertStatus,
): AlertDetails => {
  return {
    timeout: DEFAULT_TIMEOUT,
    message,
    status,
  };
};
