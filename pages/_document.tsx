import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            // TODO: Add theme selector
            <Html data-theme="light">
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument