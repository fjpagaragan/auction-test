import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AlertDetails } from "@alert/models/view";

import { ResetAlert, SetAlert } from "@alert/actions";


const useAlert = (
  showAlert: boolean,
  details: AlertDetails,
  dependency: any[],
): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (showAlert) {
      dispatch(
        SetAlert({
          ...details,
          status: details.status ?? "info",
        }),
      );
    }

    return () => {
      dispatch(ResetAlert());
    };
  }, [...dependency]);
};

export default useAlert;
