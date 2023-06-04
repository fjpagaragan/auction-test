import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isUndefined } from "lodash";
import { useFormik } from "formik";

import { 
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Flex, 
    FormControl, 
    FormErrorMessage, 
    Heading, 
    Input, 
    InputGroup, 
    InputRightElement, 
    SimpleGrid, 
    Stack, 
    Text 
} from "@chakra-ui/react";

import { loginValidationSchema, registerValidationSchema } from "@login/validations";
import { LoginFormProps, loginFormInitialValues } from "@login/views";
import { AuthenticateUser, CreateUser } from "@login/actions";
import { selectAuthenticateUser, selectCreateUser } from "@login/epics";
import { authenticateUserReducer, createUserReducer } from "@login/reducers";
import { useReducer } from "@hooks/useReducer";
import { ApiErrorStatus } from "@utils/api/api-response";
import { SetAlert } from "@alert/actions";
import { DEFAULT_TIMEOUT } from "@alert/utils/constants";


const Login: FC = () => {

    const dispatch = useDispatch();

    const createUserState = useSelector(selectCreateUser);
    const authenticateUserState = useSelector(selectAuthenticateUser);

    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    useReducer("createUser", createUserReducer);
    useReducer("authenticateUser", authenticateUserReducer);
    
    const isShowPasswordHandler = () => {
        setIsShowPassword(!isShowPassword);
    }

    const isNoAccountHandler = () => {
        setIsRegister(!isRegister);
        form.resetForm();
    };

    const form = useFormik({
        initialValues: loginFormInitialValues, 
        validationSchema: !isRegister ? loginValidationSchema : registerValidationSchema, 
        onSubmit: values => {submitHandler(values)}});

    const submitHandler = (values: LoginFormProps): void => {
        if (!isRegister) {
            submiteAuthenticateUserHandler(values);
        } else {
            submitCreateUserHandler(values);
        }
    };
    
    const submitCreateUserHandler = (values: LoginFormProps): void => {
        dispatch(CreateUser({ user: values}));
    }

    const submiteAuthenticateUserHandler = (values: LoginFormProps): void => {
        dispatch(AuthenticateUser({ user: values}));
    }

    useEffect(() => {
        const createUser = createUserState?.createUser;
        
        if (!isUndefined(createUser?.success)) {
            const alerDetails = {
                status: "success",
                message: `Successfuly created user [${createUser?.success.email}]. You can now log in.`,
                timeout: DEFAULT_TIMEOUT,
            }
            dispatch(SetAlert(alerDetails));
            form.resetForm();
        } else if (createUser?.error) {
            let errorAlertDetails;
            switch (createUser.error.response.status) {
                case ApiErrorStatus.BAD_REQUEST:
                    errorAlertDetails = {
                        status: "error",
                        message: createUser.error.response.detail,
                        timeout: DEFAULT_TIMEOUT,
                    };                    
                    break;
                
                case ApiErrorStatus.INTERNAL_SERVER_ERROR:
                    errorAlertDetails = {
                        status: "error",
                        message: createUser.error.response.error,
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
    }, [createUserState]);

    useEffect(() => {
        const authenticateUser = authenticateUserState?.authenicateUser;
        if (!isUndefined(authenticateUser?.success)) {
            const alerDetails = {
                status: "info",
                message: `Redirecting...`,
                timeout: DEFAULT_TIMEOUT,
            }
            dispatch(SetAlert(alerDetails));
            form.resetForm();
        } else if (authenticateUser?.error) {
            let errorAlertDetails;
            switch (authenticateUser.error.response.status) {
                case ApiErrorStatus.BAD_REQUEST:
                    errorAlertDetails = {
                        status: "error",
                        message: authenticateUser.error.response.detail,
                        timeout: DEFAULT_TIMEOUT,
                    };                    
                    break;
                
                case ApiErrorStatus.INTERNAL_SERVER_ERROR:
                    errorAlertDetails = {
                        status: "error",
                        message: authenticateUser.error.response.error,
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
    }, [authenticateUserState]);

    return (
        <form onSubmit={form.handleSubmit}>
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Card direction="column" background="gray.50" p={20} rounded={6} align={"center"}>
                <CardHeader>
                    <Heading mb={6}>{ !isRegister ? "Log In" : "Sign Up"}</Heading>
                </CardHeader>
                <CardBody>
                    <FormControl isInvalid={!isUndefined(form.errors.email) && !isUndefined(form.touched.email)} mb={4}>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            variant="filled"
                            type="email"
                            value={form.values.email}
                            onChange={form.handleChange}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!isUndefined(form.errors.password)} mb={4}>
                        <InputGroup size='md'>
                        <Input
                            id="password"
                            name="password"
                            variant="filled" 
                            pr='4.5rem'
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={form.values.password}
                            onChange={form.handleChange}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={isShowPasswordHandler}>
                            {isShowPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                </CardBody>
                <CardFooter>
                    <SimpleGrid column={1} spacing={5}>
                    { !isRegister ? (
                        <>
                            <Button 
                                colorScheme="blue" 
                                type="submit"
                                isLoading={form.isSubmitting}
                                >
                                    Log In
                                </Button>
                            <Stack direction="row" mb={6} spacing={2} align={"center"}>
                                <Text fontSize="lg">
                                    No account?
                                </Text>
                                <Button colorScheme='blue' variant='link' onClick={() => isNoAccountHandler()}>
                                    Sign Up
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Button 
                                colorScheme="blue" 
                                variant='outline' 
                                type="submit"
                                isLoading={form.isSubmitting}
                                >
                                    Sign Up
                                </Button>
                            <Stack direction="row" mb={6} spacing={2} align={"center"}>
                                <Text fontSize="lg">
                                    Already have an account?
                                </Text>
                                <Button colorScheme='blue' variant='link' onClick={() => isNoAccountHandler()}>
                                    Log In
                                </Button>
                            </Stack>
                        </>
                    )}
                    </SimpleGrid>
                </CardFooter>
            </Card>
        </Flex>
        </form>
    )

}

export default Login;