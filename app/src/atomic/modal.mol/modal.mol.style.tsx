import styled from "styled-components";

export interface ModalStyledProps {
  opened?: boolean;
}

const Wrapper = styled.div<ModalStyledProps>`
  display: inherit;
  flex-direction: inherit;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  padding: ${({ theme }) => theme.padding.Large};
`;

export const ModalStyled = { Wrapper };
