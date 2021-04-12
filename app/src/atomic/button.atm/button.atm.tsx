import { ButtonHTMLAttributes } from "react";
import { ButtonStyled } from "./button.atm.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: string;
  ready?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, ...other }) => {
  return <ButtonStyled.Wrapper {...other}>{children}</ButtonStyled.Wrapper>;
};
