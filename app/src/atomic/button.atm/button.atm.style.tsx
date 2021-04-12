import styled from "styled-components";
import { PalleteColor } from "../constants.obj";

interface ButtonProps {
  ready?: boolean;
}

const Wrapper = styled.button<ButtonProps>`
  ${({ theme, ready }) => `
  padding:${theme.padding.XSmall} ${theme.padding.Small};
  font-size:${theme.typography.size.medium};
  background-color:${ready ? theme.colors.secondary : PalleteColor.Gray};
  color:${ready ? theme.colors.primary : PalleteColor.Black};
  font-weight:${ready && "bold"};
  `};
`;

export const ButtonStyled = { Wrapper };
