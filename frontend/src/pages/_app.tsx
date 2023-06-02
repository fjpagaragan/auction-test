import { AppProps } from "next/app"
import { ReactElement } from "react"
import { ChakraProvider, CSSReset } from "@chakra-ui/react";



const MyApp = ({
    Component,
    pageProps
}: AppProps): ReactElement => {
    return (
        <ChakraProvider>
            <CSSReset />
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp;