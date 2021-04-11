import { theme, ThemeName } from "@atomic";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { setConfiguration } from "react-grid-system";
import { GlobalStyle } from "@components";

setConfiguration({ maxScreenClass: "xl", gridColumns: 12 });

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(ThemeName.Light);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <Head>
        <title>Mars Rover Navigator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
