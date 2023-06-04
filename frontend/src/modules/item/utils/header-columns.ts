import { IconButton } from "@chakra-ui/react";
import { Item, ItemTableRow } from "@item/views";
import { TableColumn } from "react-data-table-component";
import { RiAuctionLine } from "react-icons/ri";


export const ItemColumns: TableColumn<ItemTableRow>[] = [
    {
        name: 'Name',
        selector: row => row.name
    },
    {
        name: 'Current Price',
        selector: row => row.current_price
    },
    {
        name: 'Duration',
        selector: row => row.duration
    },
    {
        name: '',
        // @ts-expect-error
        selector: row => row.actions
    }
]