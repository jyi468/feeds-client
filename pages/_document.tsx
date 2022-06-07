import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    onYoutubeLoaded = () => {
        console.log('youtube loaded');
    }

    render() {
        return (
            // TODO: Add theme selector
            <Html data-theme="light">
                <Head>
                    <script src="/scripts/widgets.js"></script>
                </Head>
                <Script src="https://www.youtube.com/iframe_api" onLoad={this.onYoutubeLoaded}/>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument