import { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";


const Document: NextPage = () => {
    return (
        <Html lang="en">
            <Head />
            <body className="h-full">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;