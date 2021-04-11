import { Border, Padding, PalleteColor, Typography } from '../constants.obj';

const themeShared = {
  typography: {
    fontFamily: Typography.FontFamily,
    size: {
      small: Typography.Small,
      normal: Typography.Normal,
      medium: Typography.Medium,
      large: Typography.Large
    }
  },
  border: Border,
  padding: Padding
};

export interface ThemeColors {
  colors: {
    primary: PalleteColor;
    secondary: PalleteColor;
    background: PalleteColor;
    acessory?: PalleteColor;
    highlight?: PalleteColor;
    link?: PalleteColor;
    text?: PalleteColor;
    title?: PalleteColor;
  };
}

export enum ThemeName {
  Dark = 'dark',
  Light = 'light'
}

export type Theme = ThemeColors & typeof themeShared;

export const theme: Record<ThemeName, Theme> = {
  light: {
    ...themeShared,
    colors: {
      primary: PalleteColor.Black,
      secondary: PalleteColor.Primary,
      background: PalleteColor.White
    }
  },
  dark: {
    ...themeShared,
    colors: {
      primary: PalleteColor.White,
      secondary: PalleteColor.Primary,
      background: PalleteColor.Black
    }
  }
};
