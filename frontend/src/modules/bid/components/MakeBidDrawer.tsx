import { FC, useEffect } from "react";
import { 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
    FormControl, 
    FormErrorMessage, 
    DrawerFooter, 
    Button, 
    Input 
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { Item } from "@item/views";
import { MakeBidFormProps, makeBidFormInitialValues } from "@bid/models/view";
import { makeBidValidationSchema } from "@bid/validations";
import { isUndefined } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { MakeBid } from "@bid/actions";
import { selectMakeBid } from "@bid/store/epic";
import { useReducer } from "@hooks/useReducer";
import { makeBidReducer } from "@bid/reducers";
import { DEFAULT_TIMEOUT } from "@alert/utils/constants";
import { SetAlert } from "@alert/actions";
import { GetItems } from "@item/actions";
import { ApiErrorStatus } from "@utils/api/api-response";

type MakeBidDrawerProps = {
    isOpenBidDrawer: boolean;
    setIsOpenBidDrawer: (input: boolean) => void;
    item: Item | null;
    setSelectedItem: (input: Item | null) => void;
};

const MakeBidDrawer: FC<MakeBidDrawerProps> = ({
    isOpenBidDrawer,
    setIsOpenBidDrawer,
    item,
    setSelectedItem
}) => {

    const dispatch = useDispatch();

    const makeBidState = useSelector(selectMakeBid);

    useReducer("makeBid", makeBidReducer);

    const form = useFormik({
        initialValues: makeBidFormInitialValues,
        validationSchema: makeBidValidationSchema,
        onSubmit: values => {submitHandler(values)},
    });

    const submitHandler = (values: MakeBidFormProps) => {
        if (item) {
            dispatch(MakeBid({
                ...values,
                item_id: item.id
            }));
            setIsOpenBidDrawer(!isOpenBidDrawer);
        };
    };

    const onToggleBidDrawer = () => {
        form.resetForm();
        setIsOpenBidDrawer(!isOpenBidDrawer);
    };

    useEffect(() => {
        const makeBid = makeBidState?.makeBid;

        if (!isUndefined(makeBid?.success)) {
            const alertDetails = {
                status: "success",
                message: `Successfully created a bid.`,
                timeout: DEFAULT_TIMEOUT,
            };
            dispatch(SetAlert(alertDetails));
            dispatch(GetItems({ status: "ongoing" }));
            setSelectedItem(null);
            form.resetForm();
        } else if (makeBid?.error) {
            let errorAlertDetails;
            console.log(makeBid.error.response);

            switch (makeBid.error.response.status) {
                case ApiErrorStatus.BAD_REQUEST:
                    errorAlertDetails = {
                        status: "error",
                        message: makeBid.error.response.detail,
                        timeout: DEFAULT_TIMEOUT
                    }
                    break;
            
                case ApiErrorStatus.INTERNAL_SERVER_ERROR:
                    errorAlertDetails = {
                        status: "error",
                        message: makeBid.error.response.detail,
                        timeout: DEFAULT_TIMEOUT,
                    };                    
                    break;
    
                default:
                    break;
            };

            if (!isUndefined(errorAlertDetails)) {
                form.setSubmitting(false);
                dispatch(SetAlert(errorAlertDetails));
            }
        }
    }, [makeBidState]);

    return (
        <>
            <form id="create-deposit-form" onSubmit={form.handleSubmit}>
                <Drawer
                isOpen={isOpenBidDrawer}
                placement='right'
                onClose={onToggleBidDrawer}
                size={"md"}
                >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Make Bid for {item ? item.name : ""}</DrawerHeader>

                    <DrawerBody>
                        <FormControl isInvalid={!isUndefined(form.errors.amount)}>
                            <Input
                                id="amount"
                                name="amount"
                                placeholder="Enter Deposit Amount"
                                variant={"filled"}
                                value={form.values.amount}
                                onChange={form.handleChange}
                            />
                            <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={onToggleBidDrawer}>
                        Cancel
                    </Button>
                    <Button 
                        colorScheme='teal' 
                        type="submit"
                        isLoading={form.isSubmitting}
                        form="create-deposit-form"
                    >
                        Save
                    </Button>
                    </DrawerFooter>
                </DrawerContent>
                </Drawer>
            </form>
        </>
    );

};

export default MakeBidDrawer