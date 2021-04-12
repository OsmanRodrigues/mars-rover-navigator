import { Label } from "@atomic/typography.atm";
import { Col, Row } from "react-grid-system";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions,
  FieldError,
  DeepMap
} from "react-hook-form/dist/types";
import { FormStyled } from "./form.mol.style";

export enum InputType {
  Text = "text",
  Number = "number",
  TextArea = "textarea",
  Select = "select"
}

export interface Option {
  value: number | string;
  name: number | string;
}

interface InputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  type?: InputType;
  formOptions?: RegisterOptions;
  options?: Option[];
  label?: string;
  expanded?: boolean;
  error?: FieldError;
}

export const Input: React.FC<InputProps> = props => {
  const typePlaceholder = props.type ?? InputType.Text;
  const isTextOrNumber =
    typePlaceholder === InputType.Text || typePlaceholder === InputType.Number;
  const isSelect = typePlaceholder === InputType.Select && props.options;
  const currentError: FieldError = props.error?.[props.name];

  return (
    <Row align="center">
      {props.label ? (
        <Col xs={12}>
          <Label htmlFor={props.name} highlight={true}>
            {props.label}
          </Label>
        </Col>
      ) : null}
      <Col xs={12}>
        <FormStyled.Input
          as={!isTextOrNumber && typePlaceholder}
          expanded={props.expanded}
          type={typePlaceholder}
          {...props.register(props.name, props.formOptions)}
        >
          {isSelect
            ? props.options.map(option => (
                <option
                  key={`${option.name}+${option.value}`}
                  value={option.value}
                >
                  {option.name}
                </option>
              ))
            : null}
        </FormStyled.Input>
        {currentError ? <Label>{currentError.message}</Label> : null}
      </Col>
    </Row>
  );
};
