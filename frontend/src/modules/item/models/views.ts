import { ReactElement } from "react";

export type Item = {
    id: string;
    name: string;
    current_price: string;
    duration: string;
}

export type ItemTableRow = {
    name: string;
    current_price: string;
    duration: string;
    actions: ReactElement;
}

export interface CreateItemFormProps {
    name: string;
    start_price: number | null;
    duration: number | null;
}

export const createItemFormInitialValues: CreateItemFormProps = {
    name: "",
    start_price: null,
    duration: null,
}