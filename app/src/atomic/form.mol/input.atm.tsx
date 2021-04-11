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
}

export const Input: React.FC<InputProps> = props => (
  <FormStyled.Input
    type={props.type ?? InputType.Text}
    {...props.register(props.name, props.options)}
  />
);
