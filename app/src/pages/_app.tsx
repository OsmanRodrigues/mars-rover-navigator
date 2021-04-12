import { FlipSwitch, theme, ThemeName } from "@atomic";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import { useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { setConfiguration } from "react-grid-system";
import { GlobalStyle } from "@components";

setConfiguration({ maxScreenClass: "lg", gridColumns: 12 });

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(ThemeName.Light);

  const handleChangeTheme = () => {
    currentTheme === ThemeName.Light
      ? setCurrentTheme(ThemeName.Dark)
      : setCurrentTheme(ThemeName.Light);
  };

  return (
    <ThemeProvider
      theme={currentTheme === ThemeName.Dark ? theme.dark : theme.light}
    >
      <GlobalStyle />
      <Head>
        <title>Mars Rover Navigator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlipSwitch onClick={handleChangeTheme} theme={currentTheme} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
