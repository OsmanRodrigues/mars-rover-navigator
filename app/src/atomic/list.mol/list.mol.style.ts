import { Gap } from "@atomic/constants.obj";
import styled from "styled-components";

const UL = styled.ul`
  background: none;
`;
const LI = styled.li`
  display: inline-block;
  padding: ${({ theme }) => theme.padding.XSmall};
  max-width: 40%;
`;

export const ListStyled = { UL, LI };
