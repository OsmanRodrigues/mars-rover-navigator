/* eslint-disable @typescript-eslint/no-empty-interface */
import { Theme } from "@atomic";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
