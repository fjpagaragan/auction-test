import { Epic } from "redux-observable";

import { authenticateUserEpic, createUserEpic } from "@login/epics";


export const epicList: Epic[] = [

    createUserEpic,
    authenticateUserEpic
];
  
  