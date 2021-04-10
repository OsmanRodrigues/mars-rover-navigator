import { Wrapper } from '@components/test.component';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mars Rover Navigator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Wrapper>
        <h1>Hello, mars!</h1>
      </Wrapper>
    </div>
  );
}
