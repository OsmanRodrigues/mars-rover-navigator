import styled from "styled-components";
import { buttonRawStyle, PalleteColor } from "../constants.obj";

interface ButtonProps {
  ready?: boolean;
  kind?: "text";
}

const Wrapper = styled.button<ButtonProps>`
  ${({ theme, ready, kind }) => `
  padding:${theme.padding.XSmall} ${theme.padding.Small};
  font-size:${theme.typography.size.medium};
  background-color:${ready ? theme.colors.secondary : PalleteColor.Gray};
  color:${ready ? theme.colors.primary : PalleteColor.Black};
  font-weight:${ready && "bold"};
  ${kind === "text" && buttonRawStyle}
  `};
`;

export const ButtonStyled = { Wrapper };
