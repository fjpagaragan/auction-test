import { ResetAlert } from "@alert/actions";
import { selectAlert } from "@alert/store/epic";
import { AlertStatus } from "@alert/utils/constants";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { isUndefined } from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"


const AlertComponent: FC = () => {
    const dispatch = useDispatch();
    const alertDetails = useSelector(selectAlert).alert;

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();
    const [_showAlert, setShowAlert] = useState<boolean>(false);

    const hideAlert = (): void => {
        setShowAlert(false);
        dispatch(ResetAlert());
    };
    
    useEffect(() => {
        setShowAlert(!isUndefined(alertDetails));
        if (alertDetails) {
          const { timeout: __timeout = 0, onTimeout: __onTimeout = () => {} } =
            alertDetails;
    
          /**
           * Clear previous timeout in case a new alertState
           * was set before it was executed
           */
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
    
          /**
           * Set new timeout
           */
          if (__timeout) {
            timeoutRef.current = setTimeout(() => {
              hideAlert();
              void __onTimeout();
            }, alertDetails.timeout);
          }
        }
      }, [alertDetails]);
    
      useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, []);
    
      return (
        <>
          {_showAlert && alertDetails?.message !== "" && (
            <Alert status={alertDetails?.status ?? AlertStatus.INFO}>
                <AlertIcon />
            {alertDetails?.message ?? ""}
            </Alert>
          )}
        </>
      );
      
}

export default AlertComponent;