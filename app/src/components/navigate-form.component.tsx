import {
  Button,
  FormStyled,
  H1,
  H2,
  H4,
  Input,
  InputType,
  Label,
  ListStyled,
  Modal,
  Option,
  Separator
} from "@atomic";
import { CardinalPoint, MoveVariables } from "@model";
import { ServiceName, useRequest } from "data";
import { Fragment, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useForm } from "react-hook-form";

const cardinalPointsOptions: Option[] = [
  { name: CardinalPoint.North, value: CardinalPoint.North[0] },
  { name: CardinalPoint.South, value: CardinalPoint.South[0] },
  { name: CardinalPoint.East, value: CardinalPoint.East[0] },
  { name: CardinalPoint.West, value: CardinalPoint.West[0] }
];

const allRequired = { required: true };

export const NavigateForm: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<Record<string, string>>();
  const [rovers, setRovers] = useState<Record<string, string>[]>([]);
  const [finalPositions, setFinalPositions] = useState<
    [number, number, string][]
  >(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState,
    clearErrors,
    reset
  } = useForm();
  const { serialRequest } = useRequest(ServiceName.move);

  const handleAddRover = (roverName: string) => {
    const formValues = getValues();
    const formRoverKeys = Object.keys(formValues).filter(formKey =>
      formKey.includes(roverName)
    );
    let hoverInfos = { name: roverName };
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

  const handleOpenRoverModal = () => {
    const name = `Rover${rovers.length + 1}`;
    setCurrentModal({ name });
  };

  const handleOpenPositionsModal = (name: string) => {
    setCurrentModal({ name });
  };

  const handleCancel = () => {
    setCurrentModal(null);
  };

  const submitNavigation = async formData => {
    const serialVariables: MoveVariables[] = rovers.map(rover => {
      const instructionsParam = "Instructions";
      const roverKeys = Object.keys(rover);
      const instructionsKey = roverKeys.find(key =>
        key.includes(instructionsParam)
      );
      const initialPositionKeys = roverKeys.filter(
        key => key !== instructionsKey && key !== "name"
      );
      const initialPositionValues = initialPositionKeys.map(key => rover[key]);
      const instructions = rover[instructionsKey];
      const initialPosition = initialPositionValues.join(" ");

      return {
        limitCoordinate: [
          formData["plateuCoordinateX"],
          formData["plateuCoordinateY"]
        ],
        roverInfos: [initialPosition, instructions]
      };
    });
    const serialResponse = await serialRequest(serialVariables);
    const finalPositionsResponse = serialResponse.map(
      response => response.data.finalPosition
    );
    const modalName = `Positions${finalPositionsResponse.length + 1}`;

    setFinalPositions(finalPositionsResponse);
    handleOpenPositionsModal(modalName);
    setRovers([]);
    reset();
  };

  const currentModalName = currentModal?.name;
  const isRoverModal = currentModalName?.includes("Rover");
  const isPositionsModal = currentModalName?.includes("Positions");
  const ready =
    getValues()?.["plateuCoordinateX"] &&
    getValues()?.["plateuCoordinateY"] &&
    rovers.length > 0;
  const currentErrosKeys = Object.keys(formState.errors);

  return (
    <FormStyled.Wrapper>
      {currentErrosKeys?.length > 0 ? (
        <>
          <H2 highlight={true}>{"Errors"}</H2>
          <ListStyled.UL>
            {currentErrosKeys.map(errorKey => {
              const errorValue = formState.errors[errorKey];
              return (
                <Fragment key={errorKey + "Error"}>
                  <ListStyled.LI>
                    {`${errorKey}: ${errorValue?.type}`}
                    <Button
                      ready={true}
                      kind="text"
                      onClick={() => clearErrors(errorKey)}
                    >
                      X
                    </Button>
                  </ListStyled.LI>
                  <Separator type="vertical" size="small" />
                </Fragment>
              );
            })}
          </ListStyled.UL>
          <Separator />
        </>
      ) : null}
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
      {isRoverModal && (
        <Modal key={currentModalName}>
          <Label highlight={true}>{"Initial position"}</Label>
          <Row>
            <Col xs={6}>
              <Input
                label="X:"
                name={`${currentModalName}CoordinateX`}
                register={register}
                type={InputType.Number}
                formOptions={{
                  ...allRequired,
                  valueAsNumber: true,
                  max: getValues()?.["plateuCoordinateX"]
                }}
              />
            </Col>
            <Col xs={6}>
              <Input
                label="Y:"
                name={`${currentModalName}CoordinateY`}
                register={register}
                type={InputType.Number}
                formOptions={{
                  ...allRequired,
                  valueAsNumber: true,
                  max: getValues()?.["plateuCoordinateY"]
                }}
              />
            </Col>
            <Col xs={6}>
              <Input
                label="Orientation:"
                name={`${currentModalName}Orientation`}
                register={register}
                type={InputType.Select}
                options={cardinalPointsOptions}
                formOptions={allRequired}
              />
            </Col>
          </Row>
          <Input
            label="Instructions"
            name={`${currentModalName}Instructions`}
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
              <Button
                ready={true}
                onClick={() => handleAddRover(currentModalName)}
              >
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
      {!isRoverModal && (
        <Button ready={!ready} onClick={handleOpenRoverModal}>
          {"Add rover"}
        </Button>
      )}
      <Separator size="large" />
      <Button
        disabled={!ready}
        ready={ready}
        onClick={handleSubmit(submitNavigation)}
      >
        {ready ? "Navigate!" : "Not ready yet..."}
      </Button>
      {isPositionsModal ? (
        <Modal>
          <Row>
            <Col>
              <H1 highlight={true}>{"Final positions"}</H1>
            </Col>
          </Row>
          <Separator size="large" />
          {finalPositions.map((finalPosition, index) => {
            const roverName = `Rover${index + 1}`;
            return (
              <Fragment key={roverName + "Final"}>
                <H2 highlight={true}>{roverName}</H2>
                <H4 highlight={true}>{finalPosition}</H4>
                <Separator size="small" />
              </Fragment>
            );
          })}
          <Separator size="medium" />
          <Row>
            <Col xs={12}>
              <Button ready={true} onClick={handleCancel}>
                {"Close"}
              </Button>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </FormStyled.Wrapper>
  );
};
