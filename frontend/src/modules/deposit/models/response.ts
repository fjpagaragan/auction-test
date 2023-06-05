

export interface DepositApiResponse {
    id: string;
    user_id: string;
    amount: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface DepositApiParameters {
    amount: number;
}