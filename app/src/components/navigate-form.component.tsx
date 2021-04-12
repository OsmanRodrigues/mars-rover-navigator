import {
  Button,
  FormStyled,
  H2,
  Input,
  InputType,
  Label,
  ListStyled,
  Modal,
  Option,
  Separator
} from "@atomic";
import { CardinalPoint } from "@model";
import { api } from "data/api";
import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useForm } from "react-hook-form";

const cardinalPointsOptions: Option[] = [
  { name: CardinalPoint.North, value: CardinalPoint.North[0] },
  { name: CardinalPoint.South, value: CardinalPoint.South[0] },
  { name: CardinalPoint.East, value: CardinalPoint.East[0] },
  { name: CardinalPoint.West, value: CardinalPoint.West[0] }
];

const allRequired = { required: true };

type RoverInfos = Record<string, string>;

export const NavigateForm: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<RoverInfos>();
  const [rovers, setRovers] = useState<RoverInfos[]>([]);
  const { register, handleSubmit, getValues } = useForm();

  const handleAddRover = (roverName: string) => {
    const formValues = getValues();
    const formRoverKeys = Object.keys(formValues).filter(formKey =>
      formKey.includes(roverName)
    );
    let hoverInfos: RoverInfos = { name: roverName };
    formRoverKeys.forEach(key => {
      hoverInfos = { ...hoverInfos, [key]: formValues[key] };
    });
    setRovers(prevRovers => [...prevRovers, hoverInfos]);
    setCurrentModal(null);
  };

  const handleRemoveRover = roverIndex => {
    setRovers(currentRovers => {
      const roversCopy = [...currentRovers];
      roversCopy.splice(roverIndex, 1);

      return roversCopy;
    });
  };

  const handleOpenModal = () => {
    const name = `Rover${rovers.length + 1}`;
    setCurrentModal({ name });
  };

  const handleCancel = () => {
    setCurrentModal(null);
  };

  const submitNavigation = formData => {
    console.log(formData);
  };

  const roverName = currentModal?.name;
  const ready =
    rovers.length > 0 &&
    getValues()?.["plateuCoordinateX"] &&
    getValues()?.["plateuCoordinateY"];

  useEffect(() => {
    api
      .move({ limitCoordinate: [6, 6], roverInfos: ["3 3 E", "MMRMMRMRRM"] })
      .then(response => console.log(response.data))
      .then(err => console.log(err));
  }, []);

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
            formOptions={{ ...allRequired, valueAsNumber: true }}
          />
        </Col>
        <Col xs={6}>
          <Input
            label="Y:"
            name="plateuCoordinateY"
            register={register}
            type={InputType.Number}
            formOptions={{ ...allRequired, valueAsNumber: true }}
          />
        </Col>
      </Row>
      <Separator size="large" />
      <H2 highlight={true}>{"Rover"}</H2>
      {!!roverName && (
        <Modal key={roverName}>
          <Label highlight={true}>{"Initial position"}</Label>
          <Row>
            <Col xs={6}>
              <Input
                label="X:"
                name={`${roverName}CoordinateX`}
                register={register}
                type={InputType.Number}
                formOptions={{ ...allRequired, valueAsNumber: true }}
              />
            </Col>
            <Col xs={6}>
              <Input
                label="Y:"
                name={`${roverName}CoordinateY`}
                register={register}
                type={InputType.Number}
                formOptions={{ ...allRequired, valueAsNumber: true }}
              />
            </Col>
            <Col xs={6}>
              <Input
                label="Orientation:"
                name={`${roverName}Orientation`}
                register={register}
                type={InputType.Select}
                options={cardinalPointsOptions}
                formOptions={allRequired}
              />
            </Col>
          </Row>
          <Input
            label="Instructions"
            name={`${roverName}Instructions`}
            register={register}
            type={InputType.TextArea}
            formOptions={allRequired}
          />
          <Separator size="medium" />
          <Row>
            <Col xs={6}>
              <Button onClick={handleCancel}>{"Cancel"}</Button>
            </Col>
            <Col xs={6}>
              <Button ready={true} onClick={() => handleAddRover(roverName)}>
                {"Confirm"}
              </Button>
            </Col>
          </Row>
        </Modal>
      )}
      <ListStyled.UL>
        {rovers
          .filter(rover => !!rover.name)
          .map((roverFiltered, index) => (
            <Fragment key={roverFiltered.name + "Visualization"}>
              <ListStyled.LI>
                {roverFiltered.name}
                <Button
                  ready={true}
                  kind="text"
                  onClick={() => handleRemoveRover(index)}
                >
                  X
                </Button>
              </ListStyled.LI>
              <Separator type="vertical" size="small" />
            </Fragment>
          ))}
      </ListStyled.UL>
      <Separator />
      {!roverName && (
        <Button ready={!ready} onClick={handleOpenModal}>
          {"Add rover"}
        </Button>
      )}
      <Separator size="large" />
      <Button ready={ready} onClick={handleSubmit(submitNavigation)}>
        {ready ? "Navigate!" : "Not ready yet..."}
      </Button>
    </FormStyled.Wrapper>
  );
};
