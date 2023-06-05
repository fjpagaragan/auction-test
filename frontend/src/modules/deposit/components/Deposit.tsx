import { Text } from "@chakra-ui/react";
import { useDeposit } from "@deposit/hooks/useDeposit";
import { depositReducer } from "@deposit/reducers";
import { DepositApiResponse } from "@deposit/response";
import { useReducer } from "@hooks/useReducer";
import { isUndefined } from "lodash";
import { FC, useEffect, useState } from "react";


const Deposit: FC = () => {
    const { loading, success } = useDeposit() ?? {};

    const [deposit, setDeposit] = useState<DepositApiResponse>();

    useReducer("deposit", depositReducer);

    useEffect(() => {
        if (!isUndefined(success)) {
            setDeposit(success);
        }
    }, [success]);

    return (
        <>
            <Text as='b'>
                Balance: { deposit && deposit.amount 
                            ? Number(deposit.amount).toFixed(2) 
                            : 0.00} $
            </Text>
        </>
    );
}

export default Deposit;