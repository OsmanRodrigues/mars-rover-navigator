import { Label } from "@atomic/typography.atm";
import { Col, Row } from "react-grid-system";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions
} from "react-hook-form/dist/types";
import { FormStyled } from "./form.mol.style";

export enum InputType {
  Text = "text",
  TextArea = "textarea"
}

interface InputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  type?: InputType;
  options?: RegisterOptions;
  label?: string;
  expanded?: boolean;
}

export const Input: React.FC<InputProps> = props => (
  <Row align="center">
    {props.label ? (
      <Col xs={12}>
        <Label highlight={true}>{props.label}</Label>
      </Col>
    ) : null}
    <Col xs={12}>
      <FormStyled.Input
        as={props.type === InputType.TextArea && InputType.TextArea}
        expanded={props.expanded}
        type={props.type ?? InputType.Text}
        {...props.register(props.name, props.options)}
      />
    </Col>
  </Row>
);
