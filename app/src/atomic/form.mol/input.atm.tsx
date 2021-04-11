import { Label } from "@atomic/typography.atm";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions
} from "react-hook-form/dist/types";
import { FormStyled } from "./form.mol.style";

export enum InputType {
  Text = "text"
}

interface InputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  type?: InputType;
  options?: RegisterOptions;
  label?: string;
}

export const Input: React.FC<InputProps> = props => (
  <>
    {props.label ? <Label highlight={true}>{props.label}</Label> : null}
    <FormStyled.Input
      type={props.type ?? InputType.Text}
      {...props.register(props.name, props.options)}
    />
  </>
);
