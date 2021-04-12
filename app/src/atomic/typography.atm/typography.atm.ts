import styled, { css } from "styled-components";

interface TypographyProps {
  center?: boolean;
  highlight?: boolean;
}

const typographySharedStyle = css<TypographyProps>`
  text-align: ${({ center }) => (center ? "center" : "left")};
  text-justify: center;
  background: none;
  color: ${({ highlight, theme }) =>
    highlight ? theme.colors.background : "unset"};
`;

const secondaryHeadingStyle = css`
  color: ${({ theme }) => theme.colors.secondary};
`;

export const H1 = styled.h1`
  ${typographySharedStyle}
`;
export const H2 = styled.h2`
  ${typographySharedStyle}
  ${secondaryHeadingStyle}
`;
export const H3 = styled.h3`
  ${typographySharedStyle}
`;
export const H4 = styled.h4`
  ${typographySharedStyle}
`;
export const Label = styled.label`
  ${typographySharedStyle}
`;
export const HeroDisplay = styled(H1)`
  font-size: ${({ theme }) => theme.typography.size.xlarge};
`;
