import styled from "styled-components";
import { PalleteColor } from "../constants.obj";

interface ButtonProps {
  ready?: boolean;
}

const Wrapper = styled.button<ButtonProps>`
  ${({ theme }) => `
  font-size:${theme.typography.size.medium};
  background-color:${PalleteColor.Gray};
  color:${PalleteColor.Black};
  `};
  /* font-weight: bold; */
`;

export const ButtonStyled = { Wrapper };
