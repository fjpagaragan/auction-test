

export type Deposit = {
    id: string;
    amount: number;
}

export interface MakeDepositFormProps {
    amount: number;
}

export const makeDepositFormInitialValues: MakeDepositFormProps = {
    amount: 0,
};