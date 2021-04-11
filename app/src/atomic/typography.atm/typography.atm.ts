import styled, { css } from "styled-components";

interface TypographyProps {
  center?: boolean;
}

const typographyShared = css<TypographyProps>`
  text-align: ${({ center }) => (center ? "center" : "left")};
`;

export const H1 = styled.h1`
  ${typographyShared}
`;
export const H2 = styled.h2`
  ${typographyShared}
`;
export const H3 = styled.h3`
  ${typographyShared}
`;
export const H4 = styled.h4`
  ${typographyShared}
`;
export const Label = styled.label`
  ${typographyShared}
`;
export const HeroDisplay = styled(H1)`
  font-size: ${({ theme: { typography } }) => typography.size.large};
`;
