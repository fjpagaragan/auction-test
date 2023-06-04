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