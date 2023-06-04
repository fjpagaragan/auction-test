import { Epic } from "redux-observable";

import { authenticateUserEpic, createUserEpic } from "@login/epics";
import { resetAlertEpic, setAlertEpic } from "@alert/store/epic";
import { getItemsEpic } from "@item/epics";


export const epicList: Epic[] = [

    // alerts
    setAlertEpic,
    resetAlertEpic,

    getItemsEpic,

    createUserEpic,
    authenticateUserEpic
];
  
  