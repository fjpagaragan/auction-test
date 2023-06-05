import { SetAlert } from "@alert/actions";
import { DEFAULT_TIMEOUT } from "@alert/utils/constants";
import { 
    Button, 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    FormControl, 
    FormErrorMessage, 
    Input
} from "@chakra-ui/react";
import { useReducer } from "@hooks/useReducer";
import { CreateItem, GetItems } from "@item/actions";
import { selectCreateItem } from "@item/epics";
import { createItemReducer } from "@item/reducers";
import { createItemValidationSchema } from "@item/validations";
import { CreateItemFormProps, createItemFormInitialValues } from "@item/views";
import { ApiErrorStatus } from "@utils/api/api-response";
import { useFormik } from "formik";
import { isUndefined } from "lodash";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type CreateItemModalProps = {
    isOpenItemDrawer: boolean;
    setIsOpenItemDrawer: (input: boolean) => void;
}

const CreateItemModal: FC<CreateItemModalProps> = ({
    isOpenItemDrawer,
    setIsOpenItemDrawer
}) => {

    const dispatch = useDispatch();

    const createItemState = useSelector(selectCreateItem);

    useReducer("createItem", createItemReducer);

    const form = useFormik({
        initialValues: createItemFormInitialValues,
        validationSchema: createItemValidationSchema,
        onSubmit: values => {submitHandler(values)},
    })
    
    const submitHandler = (values: CreateItemFormProps): void => {
        dispatch(CreateItem(values));
        setIsOpenItemDrawer(!isOpenItemDrawer)
    };

    const onToggleItemModal = () => {
        form.resetForm();
        setIsOpenItemDrawer(!isOpenItemDrawer)
    }

    useEffect(() => {
        const createItem = createItemState?.createItem;

        if (!isUndefined(createItem?.success)) {
            const alertDetails = {
                status: "success",
                message: `Successfully create item - [${createItem?.success.name}]`,
                timeout: DEFAULT_TIMEOUT
            };
            dispatch(SetAlert(alertDetails));
            dispatch(GetItems({ status: "ongoing" }));
            form.resetForm();
        } else if (createItem?.error) {
            let errorAlertDetails;
            // console.log(createItem.error.response);
            
            switch (createItem.error.response.status) {
                case ApiErrorStatus.BAD_REQUEST:
                    errorAlertDetails = {
                        status: "error",
                        message: createItem.error.response.detail,
                        timeout: DEFAULT_TIMEOUT,
                    }
                    break;

                case ApiErrorStatus.INTERNAL_SERVER_ERROR:
                    errorAlertDetails = {
                        status: "error",
                        message: createItem.error.response.error,
                        timeout: DEFAULT_TIMEOUT,
                    };                    
                    break;

                default:
                    break;
            }

            if (!isUndefined(errorAlertDetails)) {
                form.setSubmitting(false);
                dispatch(SetAlert(errorAlertDetails));
            }
        }
    }, [createItemState]);

    return (
        <>
            <form id="create-item-form" onSubmit={form.handleSubmit}>
                <Drawer
                isOpen={isOpenItemDrawer}
                placement='right'
                onClose={onToggleItemModal}
                size={"md"}
                >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create Item</DrawerHeader>

                    <DrawerBody>
                        <FormControl isInvalid={!isUndefined(form.errors.name)}>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Item Name"
                                variant={"filled"}
                                value={form.values.name}
                                onChange={form.handleChange}
                            />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={!isUndefined(form.errors.start_price)}>
                            <Input
                                id="start_price"
                                name="start_price"
                                placeholder="Enter Start Price"
                                variant={"filled"}
                                type={"number"}
                                value={form.values.start_price}
                                onChange={form.handleChange}
                            />
                            <FormErrorMessage>{form.errors.start_price}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={!isUndefined(form.errors.duration)}>
                            <Input
                                id="duration"
                                name="duration"
                                placeholder="Enter Duration"
                                variant={"filled"}
                                type={"number"}
                                value={form.values.duration}
                                onChange={form.handleChange}
                            />
                            <FormErrorMessage>{form.errors.duration}</FormErrorMessage>
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={onToggleItemModal}>
                        Cancel
                    </Button>
                    <Button 
                        colorScheme='teal' 
                        type="submit"
                        isLoading={form.isSubmitting}
                        form="create-item-form"
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

export default CreateItemModal;