import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isUndefined } from "lodash";

import { IconButton } from "@chakra-ui/react";
import { RiAuctionLine } from "react-icons/ri";
import DataTable from 'react-data-table-component';

import { useReducer } from "@hooks/useReducer";
import { selectItems } from "@item/epics";
import { useItems } from "@item/hooks/useItems";
import { itemsReducer } from "@item/reducers";
import { formatItems } from "@item/transformers";
import { Item } from "@item/views";
import { ItemColumns } from "@item/utils/header-columns";





const Item: FC = () => {
    const dispatch = useDispatch();

    const getItemsState = useSelector(selectItems);

    const { loading: itemLoading, success: itemApiResponse } = useItems() ?? {};

    const [items, setItems] = useState<Item[]>([]);


    useReducer("getItems", itemsReducer);

    useEffect(() => {
        if (!isUndefined(itemApiResponse)) {
            const formattedItems = formatItems(itemApiResponse);
            setItems(formattedItems);
        } else {
            setItems([]);
        }  
    }, [itemApiResponse, itemLoading]);

    const data = useMemo(() => {
        const dataWithAction = items.map((item) => {
            return {
                ...item,
                actions: (
                    <IconButton
                        variant='outline'
                        colorScheme='blue'
                        aria-label='Make Bid'
                        icon={<RiAuctionLine />}
                    />
                )
            }
        });
        console.log(dataWithAction);
        
        return dataWithAction;
    }, [items]);

    return (
        <>
            <DataTable 
                title="Items"
                columns={ItemColumns} 
                data={data} 
            />
        </>
    );
};

export default Item;