import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input } from "@chakra-ui/react";
import { FC } from "react";


const Login: FC = () => {
    
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Card direction="column" background="gray.50" p={20} rounded={6}>
                <CardHeader>
                    <Heading mb={6}>Log In</Heading>
                </CardHeader>
                <CardBody>
                    <Input placeholder="auction.test@test.com" variant="filled" mb={6} type="email" />
                    <Input placeholder="********" variant="filled" mb={6} type="password" />
                </CardBody>
                <Button colorScheme="blue" mb={6}>Log In</Button>
                <Button colorScheme='blue' variant='outline'>
                    Register
                </Button>
            </Card>
        </Flex>
    )

}

export default Login;