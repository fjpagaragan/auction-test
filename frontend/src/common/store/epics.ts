import { Epic } from "redux-observable";

import { authenticateUserEpic, createUserEpic } from "@login/epics";
import { resetAlertEpic, setAlertEpic } from "@alert/store/epic";


export const epicList: Epic[] = [

    // alerts
    setAlertEpic,
    resetAlertEpic,


    createUserEpic,
    authenticateUserEpic
];
  
  