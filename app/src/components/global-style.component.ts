import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    @font-face{
      font-family: ${({ theme }) => theme.typography.fontFamily};
      src: url('/static/fonts/Calculator.ttf');
      font-style: normal;
      font-weight: 600;
    };
    ${({ theme: { colors, typography } }) =>
      `
    font-size: ${typography.size.medium};
    font-family: ${typography.fontFamily};
    background: ${colors.background};
    color: ${colors.primary};
  `}
  }
`;
