
export interface MakeBidApiResponse {
    id: string;
    user_id: string;
    item_id: string;
    amount: number;
    status: string;
    updatedAt: Date;
    createdAt: Date;
};

export interface MakeBidApiParameters {
    item_id: string;
    amount: number;
}

