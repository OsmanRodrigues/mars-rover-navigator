import {
  CardinalDirection,
  CardinalPoint,
  Coordinate,
  RoverInfosInput,
  Instruction,
  Position,
  RoverAction
} from '@model';

type RoverUseCase = {
  [key in RoverAction]: (params: {
    roverInfos: RoverInfosInput;
    limitCoordinate: Coordinate;
  }) => Position;
};

type ConvertInputReturn = [
  initialPosition: Position,
  instructions: Instruction[]
];

export const RoverUseCase: RoverUseCase = {
  [RoverAction.move]: params => {
    const { convertInput, updateDirection } = RoverUseCaseHelpers;
    const [initialPosition, instructions] = convertInput(params.roverInfos);
    const [limitX, limitY] = params.limitCoordinate;
    const [x, y, direction] = [...initialPosition];

    if (x > limitX || y > limitY) {
      return initialPosition;
    }

    let currentCardinalPointIndex = CardinalPoint[direction];
    let currentDirection = CardinalPoint[
      currentCardinalPointIndex
    ] as CardinalDirection;
    let currentX = x;
    let currentY = y;

    instructions.forEach(instruction => {
      if (instruction === 'M') {
        switch (currentDirection) {
          case 'N':
            currentY < limitY ? currentY++ : (currentDirection = 'S');
            break;
          case 'S':
            currentY > 0 ? currentY-- : (currentDirection = 'N');
            break;
          case 'W':
            currentX > 0 ? currentX-- : (currentDirection = 'E');
            break;
          case 'E':
            currentX < limitX ? currentX++ : (currentDirection = 'W');
            break;
        }
      } else {
        currentDirection = updateDirection(
          instruction,
          currentCardinalPointIndex
        );
      }

      currentCardinalPointIndex = CardinalPoint[currentDirection];
    });

    const finalPosition: Position = [currentX, currentY, currentDirection];

    return finalPosition;
  }
};

const RoverUseCaseHelpers = {
  convertInput: (input: RoverInfosInput): ConvertInputReturn => {
    const convertedInput = input.map((string, index) => {
      const splittedCharacters = string.split('');
      const filteredCharacters = splittedCharacters.filter(
        character => !!character.trim()
      );
      const positionOrInstructionCharacters =
        index === 0
          ? [
              +filteredCharacters[0],
              +filteredCharacters[1],
              filteredCharacters[2] as CardinalDirection
            ]
          : filteredCharacters;

      return positionOrInstructionCharacters;
    }) as [Position, Instruction[]];

    return convertedInput;
  },

  updateDirection: (
    currentInstruction: Instruction,
    currentCardinalPointIndex: CardinalPoint
  ): CardinalDirection => {
    const toLeft = currentInstruction === 'L';
    const cardinalCorrectionIndex = toLeft ? 3 : 0;
    const cardinalShiftIndex = toLeft ? -1 : 1;
    const onCardinalLimit = toLeft
      ? currentCardinalPointIndex === 0
      : currentCardinalPointIndex === 3;
    const updatedCardinalIndex = onCardinalLimit
      ? cardinalCorrectionIndex
      : currentCardinalPointIndex + cardinalShiftIndex;

    const updatedCardinalDirection = CardinalPoint[
      updatedCardinalIndex
    ] as CardinalDirection;

    return updatedCardinalDirection;
  }
};
