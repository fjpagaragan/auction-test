import { AppProps } from "next/app"
import { ReactElement, useEffect } from "react"
import { Provider } from "react-redux";
import { Box, ChakraProvider, Container, CSSReset, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@utils/auth";
import { wrapper } from "@store/index";
import AlertComponent from "@alert/components/Alert";
import NavBar from "@navigation/components/Navbar";
import Sidebar from "@navigation/components/Sidebar";




const MyApp = ({
    Component,
    pageProps,
    ...props
}: AppProps): ReactElement => {
    const router = useRouter();
    const { store } = wrapper.useWrappedStore(props);

    const renderAuthenticatedLayout = () => {
        return (
            <>
                <Sidebar children={<Component {...pageProps} />} />
            </>
          );
    };

    const renderUnAuthenticatedLayoute = () => {
        return <Component {...pageProps} />
    }

    useEffect(() => {
        if(!isAuthenticated()) {
            // router.push("/login");
            console.log("Hello");   
        }
    }, []);

    return (
        <ChakraProvider>
            <Provider store={store}>
                <AlertComponent />
                <CSSReset />
                {isAuthenticated() ? renderAuthenticatedLayout() : renderUnAuthenticatedLayoute()}
            </Provider>
        </ChakraProvider>
    )
}

export default MyApp;