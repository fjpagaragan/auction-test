export interface Bid {
    id: string;
    amount: number;
}

export interface MakeBidFormProps {
    amount: number;
}

export const makeBidFormInitialValues: MakeBidFormProps = {
    amount: 0,
}