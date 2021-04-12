/* eslint-disable no-unused-vars */
import { css } from "styled-components";

export enum PalleteColor {
  Primary = "#A853C9",
  Secondary = "#E5E5E5",
  Accessory = "#C4C4C4",
  Gray = "#828282",
  Black = "#333333",
  White = "#f5f5f5"
}
export enum Typography {
  FontFamily = "Calculator",
  Small = "0.6rem",
  Normal = "1rem",
  Medium = "1.4rem",
  Large = "1.8rem",
  XLarge = "2.4rem"
}
export enum Breakpoint {
  XXSmall = "20rem",
  XSmal = "36rem",
  Small = "48rem",
  Medium = "62rem",
  Large = "75rem",
  XLarge = "100rem"
}
export enum ZIndex {
  Low = -1,
  Neutral = 0,
  High = 100
}
export enum Transition {
  Fast = "all 0.2s linear 0.2s"
}
export enum Gap {
  Small = "0.5rem",
  Medium = "1rem",
  Large = "1.5rem",
  XLarge = "2rem",
  XXLarge = "4rem"
}
export enum Border {
  Radius = "0.5rem",
  Thickness = "0.25rem"
}
export enum Padding {
  Small = "0.5rem",
  Medium = "1rem",
  Large = "2rem",
  Xlarge = "3rem"
}
export const overlayStyle = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${ZIndex.High};
`;
export const buttonRawStyle = css`
  border: none;
  background: none;
`;
export const boxShadowStyle = css`
  box-shadow: 6px 6px 4px ${PalleteColor.Gray};
`;
