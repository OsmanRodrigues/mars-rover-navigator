import { GlobalStyle } from '@atomic';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyle />
      <Head>
        <title>Mars Rover Navigator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
