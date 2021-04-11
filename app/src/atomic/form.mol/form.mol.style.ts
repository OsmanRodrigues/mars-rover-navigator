import { boxShadowStyle } from "@atomic/constants.obj";
import styled from "styled-components";

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
`;
const Input = styled.input``;

export const FormStyled = { Wrapper, Input };
