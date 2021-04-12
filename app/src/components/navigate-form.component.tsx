import { Button, H2, Label } from "@atomic";
import { FormStyled } from "@atomic/form.mol";
import { Input, InputType, Option } from "@atomic/form.mol/input.atm";
import { Separator } from "@atomic/spacer.atm";
import { Col, Row } from "react-grid-system";
import { useForm } from "react-hook-form";

const cardinalPointsOptions: Option[] = [
  { name: "Nort", value: "N" },
  { name: "South", value: "S" },
  { name: "East", value: "E" },
  { name: "West", value: "W" }
];

export const NavigateForm: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const submitRover = formData => {
    console.log(formData);
  };

  return (
    <FormStyled.Wrapper>
      <H2 highlight={true}>{"Plateu"}</H2>
      <Label highlight={true}>{"Coordinates"}</Label>
      <Row>
        <Col xs={6}>
          <Input
            label="X:"
            name="plateuCoordinateX"
            register={register}
            type={InputType.Number}
            formOptions={{ valueAsNumber: true }}
          />
        </Col>
        <Col xs={6}>
          <Input
            label="Y:"
            name="plateuCoordinateY"
            register={register}
            type={InputType.Number}
            formOptions={{ valueAsNumber: true }}
          />
        </Col>
      </Row>
      <Separator size="large" />
      <H2 highlight={true}>{"Rover"}</H2>
      <Label highlight={true}>{"Initial position"}</Label>
      <Row>
        <Col xs={6}>
          <Input
            label="X:"
            name="roverCoordinateX"
            register={register}
            type={InputType.Number}
            formOptions={{ valueAsNumber: true }}
          />
        </Col>
        <Col xs={6}>
          <Input
            label="Y:"
            name="roverCoordinateY"
            register={register}
            type={InputType.Number}
            formOptions={{ valueAsNumber: true }}
          />
        </Col>
        <Col xs={6}>
          <Input
            label="Orientation:"
            name="roverOrientation"
            register={register}
            type={InputType.Select}
            options={cardinalPointsOptions}
          />
        </Col>
      </Row>
      <Input
        label="Instructions"
        name="roverInstructions"
        register={register}
        type={InputType.TextArea}
      />
      <Separator size="large" />
      <Button onClick={handleSubmit(submitRover)}>{"Not ready yet..."}</Button>
    </FormStyled.Wrapper>
  );
};
