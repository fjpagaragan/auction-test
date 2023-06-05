

export interface ItemApiResponse {
    id: string;
    user_id: string;
    name: string;
    start_price: number;
    current_price: number;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
};

export interface ItemApiParameters {
    status: string;
};

export interface CreateItemApiParameters {
    name: string,
    start_price: number,
    duration: number,
};