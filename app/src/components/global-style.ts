import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body{
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
      border: 4px solid ${colors.secondary};
    `}
  }
`;
