import { AppProps } from "next/app"
import { ReactElement, useEffect } from "react"
import { Provider } from "react-redux";
import { Box, ChakraProvider, Container, CSSReset, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@utils/auth";
import { wrapper } from "@store/index";
import AlertComponent from "@alert/components/Alert";
import NavBar from "@navigation/components/NavBar";




const MyApp = ({
    Component,
    pageProps,
    ...props
}: AppProps): ReactElement => {
    const router = useRouter();
    const { store } = wrapper.useWrappedStore(props);
    const showSidebarAndHeader = router.pathname !== "/auth"; 

    useEffect(() => {
        if(!isAuthenticated()) {
            router.push("/auth"); 
        } else {
            router.push("/")
        }
    }, [isAuthenticated]);

    return (
        <ChakraProvider>
            <Provider store={store}>
                <CSSReset />
                {showSidebarAndHeader && <NavBar />}
                <AlertComponent />
                <Box maxW="container.xl" mx="auto" p={4}>
                <Component {...pageProps} />
                </Box>
            </Provider>
        </ChakraProvider>
    )
}

export default MyApp;