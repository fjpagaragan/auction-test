import { AppProps } from "next/app"
import { ReactElement, useEffect } from "react"
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@utils/auth";



const MyApp = ({
    Component,
    pageProps
}: AppProps): ReactElement => {
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated()) {
            router.push("/login");
        }
    }, []);

    return (
        <ChakraProvider>
            <CSSReset />
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp;