import { useDispatch, useSelector } from "react-redux";
import { DepositState, depositReducer } from "@deposit/reducers";
import { selectDeposit } from "@deposit/store/epic";
import { useEffect } from "react";
import { GetDeposit } from "@deposit/actions";
import { useReducer } from "@hooks/useReducer";


export const useDeposit = (): DepositState["deposit"] => {
    const dispatch = useDispatch();

    const depositState = useSelector(selectDeposit)?.deposit;

    useReducer("deposit", depositReducer);

    useEffect(() => {
        dispatch(GetDeposit());
    }, []);

    return depositState;
}