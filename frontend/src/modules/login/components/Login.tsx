import { FC, useState } from "react";

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

import { loginValidationSchema } from "@login/validations";
import { LoginFormProps, loginFormInitialValues } from "@login/views";



const Login: FC = () => {

    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    
    const isShowPasswordHandler = () => {
        setIsShowPassword(!isShowPassword);
    }

    const isNoAccountHandler = () => {
        setIsRegister(!isRegister);
        form.resetForm();
    };


    const form = useFormik({
        initialValues: loginFormInitialValues, 
        validationSchema: loginValidationSchema, 
        onSubmit: values => {submitHandler(values)}});
    const submitHandler = (values: LoginFormProps): void => {
        console.log(values);
        console.log(form.errors);
    };
    
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