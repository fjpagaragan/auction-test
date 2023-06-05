import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUndefined } from "lodash";

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
import { MakeDepositFormProps, makeDepositFormInitialValues } from "@deposit/models/view";
import { makeDepositValidationSchema } from "@deposit/validations";
import { GetDeposit, MakeDeposit } from "@deposit/actions";
import { selectMakeDeposit } from "@deposit/store/epic";
import { useReducer } from "@hooks/useReducer";
import { makeDepositReducer } from "@deposit/reducers";
import { DEFAULT_TIMEOUT } from "@alert/utils/constants";
import { SetAlert } from "@alert/actions";
import { ApiErrorStatus } from "@utils/api/api-response";


type CreateDepositDrawerProps = {
    isOpenDepositDrawer: boolean;
    setIsOpenDepositDrawer: (input: boolean) => void;
};

const CreateDepositDrawer: FC<CreateDepositDrawerProps> = ({
    isOpenDepositDrawer,
    setIsOpenDepositDrawer,
}) => {

    const dispatch = useDispatch();

    const makeDepositState = useSelector(selectMakeDeposit);

    useReducer("makeDeposit", makeDepositReducer);

    const form = useFormik({
        initialValues: makeDepositFormInitialValues,
        validationSchema: makeDepositValidationSchema,
        onSubmit: values => {submitHandler(values)},
    });

    const submitHandler = (values: MakeDepositFormProps): void => {
        dispatch(MakeDeposit(values));
        setIsOpenDepositDrawer(!isOpenDepositDrawer);
    };

    const onToggleDepositDrawer = () => {
        form.resetForm();
        setIsOpenDepositDrawer(!isOpenDepositDrawer);
    };

    useEffect(() => {
        const makeDeposit = makeDepositState?.makeDeposit;

        if (!isUndefined(makeDeposit?.success)) {
            const alertDetails = {
                status: "success",
                message: `Successfully added deposit. New balance is - ${makeDeposit?.success.amount}`,
                timeout: DEFAULT_TIMEOUT
            };
            dispatch(SetAlert(alertDetails));
            dispatch(GetDeposit());
            form.resetForm();
        } else if (makeDeposit?.error) {
            let errorAlertDetails;
            console.log(makeDeposit.error.response);
            
            switch (makeDeposit.error.response.status) {
                case ApiErrorStatus.BAD_REQUEST:
                    errorAlertDetails = {
                        status: "error",
                        message: makeDeposit.error.response.detail,
                        timeout: DEFAULT_TIMEOUT
                    }
                    break;
            
                case ApiErrorStatus.INTERNAL_SERVER_ERROR:
                    errorAlertDetails = {
                        status: "error",
                        message: makeDeposit.error.response.error,
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

    }, [makeDepositState])

    return (
        <>
            <form id="create-deposit-form" onSubmit={form.handleSubmit}>
                <Drawer
                isOpen={isOpenDepositDrawer}
                placement='right'
                onClose={onToggleDepositDrawer}
                size={"md"}
                >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add Deposit</DrawerHeader>

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
                    <Button variant='outline' mr={3} onClick={onToggleDepositDrawer}>
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

export default CreateDepositDrawer;