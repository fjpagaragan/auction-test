import { Epic } from "redux-observable";

import { authenticateUserEpic, createUserEpic } from "@login/epics";
import { resetAlertEpic, setAlertEpic } from "@alert/store/epic";
import { createItemEpic, getItemsEpic } from "@item/epics";
import { getDepositEpic } from "@deposit/store/epic";


export const epicList: Epic[] = [

    // alerts
    setAlertEpic,
    resetAlertEpic,

    getItemsEpic,
    createItemEpic,

    getDepositEpic,

    createUserEpic,
    authenticateUserEpic
];
  
  