import { boxShadowStyle, Gap } from "@atomic/constants.obj";
import styled from "styled-components";
import { InputType } from "./input.atm";

interface InputProps {
  expanded?: boolean;
}

const Wrapper = styled.form`
  ${boxShadowStyle};
  ${({ theme: { border, colors, padding } }) => `
    padding:${padding.Small} ${padding.Medium};
    background-color:${colors.primary};
    border-radius:${border.Radius};
  `}
  display: flex;
  flex-direction: column;
  * {
    border-radius: inherit;
  }
  div {
    background-color: inherit;
  }
`;
const Input = styled.input<InputProps>`
  min-height: ${Gap.Medium};
  max-width: 100%;
  ${({ theme, expanded, type }) => `
    font-size: ${theme.typography.size.normal};
    width:${expanded || type === InputType.TextArea ? "100%" : "unset"};
    min-width:${type === InputType.TextArea ? "100%" : "unset"};
    max-height:${type === InputType.TextArea ? Gap.XXLarge : "unset"};
  `};
`;

export const FormStyled = { Wrapper, Input };
