import { of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { State, Epic } from "@bid/store";
import { MakeBidState } from "./reducers";
import { MAKE_BID, MakeBidAction, MakeBidFail, MakeBidSuccess } from "./actions";
import { makeBid } from "@bid/api/bid-api";



export const selectMakeBid = (state: State): MakeBidState | undefined =>
    state.makeBid;

export const makeBidEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is MakeBidAction => action.type === MAKE_BID,
        ),  
        switchMap(({ payload }) =>
            makeBid(payload).pipe(
                map((response) => MakeBidSuccess(response)),
                catchError((error) => of(MakeBidFail(error))),
            ),
        ),
    );
}