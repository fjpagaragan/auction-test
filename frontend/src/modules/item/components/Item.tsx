import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { isUndefined } from "lodash";

import { 
    Box, 
    Button, 
    HStack, 
    IconButton, 
    Tab, 
    TabList, 
    TabPanel, 
    TabPanels, 
    Tabs 
} from "@chakra-ui/react";
import { RiAuctionLine } from "react-icons/ri";
import DataTable from 'react-data-table-component';

import { useReducer } from "@hooks/useReducer";
import { useItems } from "@item/hooks/useItems";
import { itemsReducer } from "@item/reducers";
import { formatItems } from "@item/transformers";
import { Item } from "@item/views";
import { ItemCompletedColumns, ItemOngoingColumns } from "@item/utils/header-columns";
import { GetItems } from "@item/actions";
import CreateItemModal from "./CreateItemModal";





const Item: FC = () => {
    const dispatch = useDispatch();

    const { loading: itemLoading, success: itemApiResponse } = useItems("ongoing") ?? {};

    const [items, setItems] = useState<Item[]>([]);
    const [pending, setPending] = useState(true);
    const [itemStatus, setItemStatus] = useState("ongoing");

    const [isOpenItemModal, setIsOpenItemModal] = useState(false);


    useReducer("getItems", itemsReducer);

    const onBidHandler = (item: Item) => {
        console.log(item);
    };

    const changeTableHandler = (status: string) => {
        dispatch(GetItems({ status }));
        setItemStatus(status);
    }

    const toggleItemModal = () => {
        setIsOpenItemModal(!isOpenItemModal);
    }

    useEffect(() => {
        itemLoading ? setPending(true) : setPending(false);
    }, [itemLoading])

    useEffect(() => {
        if (!isUndefined(itemApiResponse)) {
            const formattedItems = formatItems(itemApiResponse);
            setItems(formattedItems);
        } else {
            setItems([]);
        }  
    }, [itemApiResponse]);


    const data = useMemo(() => {
        const dataWithAction = items.map((item) => {
            if (itemStatus === "ongoing") {
                return {
                    ...item,
                    actions: (
                        itemStatus === "ongoing" ?
                        <IconButton
                            variant='outline'
                            colorScheme='blue'
                            aria-label='Make Bid'
                            icon={<RiAuctionLine />}
                            onClick={() => onBidHandler(item)}
                        /> : <></>
                    )
                }
            } else {
                return {
                    ...item
                }
            }
        });
        
        return dataWithAction;
    }, [items]);

    return (
        <>
                <HStack justifyContent={{ base: 'space-between', md: 'flex-end' }}>
                    <Button onClick={toggleItemModal} colorScheme="teal">Create Item</Button>
                    <CreateItemModal 
                        isOpenItemModal={isOpenItemModal} 
                        onToggleItemModal={toggleItemModal}            
                    />
                    <Button colorScheme="teal" variant={"outline"}>Make Desposit</Button>
                </HStack>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab onClick={() => changeTableHandler("ongoing")}>Ongoing</Tab>
                        <Tab onClick={() => changeTableHandler("completed")}>Completed</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DataTable 
                                title="Ongoing"
                                columns={ItemOngoingColumns}
                                // @ts-expect-error
                                data={data}
                                progressPending={pending}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                title="Completed"
                                columns={ItemCompletedColumns}
                                // @ts-expect-error
                                data={data}
                                progressPending={pending}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
        </>
    );
};

export default Item;