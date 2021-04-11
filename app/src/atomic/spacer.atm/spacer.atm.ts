import { stringHelper } from "@modules/utils/string.helper.utils";
import styled from "styled-components";
import { Gap } from "../constants.obj";

const { capitalize } = stringHelper;

interface SeparatorProps {
  type?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
}

export const Separator = styled.div<SeparatorProps>`
  ${({ type, size = "medium" }) =>
    type === "vertical"
      ? `
        display: inline;
        width: ${Gap[capitalize(size)]};
        `
      : `
        display: block;
        height: ${Gap[capitalize(size)]};
        `}
`;
