import {
  CardinalDirection,
  CardinalPoint,
  Coordinate,
  RoverInfosInput,
  Instruction,
  Position,
  RoverAction
} from '@model';
import { errorGenerator } from '@modules/utils';

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
        currentDirection = updateDirection({
          instruction,
          currentCardinalPointIndex
        });
      }

      currentCardinalPointIndex = CardinalPoint[currentDirection];
    });

    const finalPosition: Position = [currentX, currentY, currentDirection];

    return finalPosition;
  }
};

const RoverUseCaseHelpers = {
  convertInput: (input: RoverInfosInput): ConvertInputReturn => {
    const coordinatePattern = /[0-9]/;
    const cardinalPointPattern = /['NESW']/;
    const instructionsPattern = /['LRM']/;

    const convertedInput = input.map((string, stringIndex) => {
      const isPositionString = stringIndex === 0;
      const splittedCharacters = string.split('');
      const filteredCharacters = splittedCharacters.filter(
        character => !!character.trim()
      );

      filteredCharacters.forEach((character, characterIndex) => {
        const isCardinalPointCharacter = characterIndex > 1;
        const matched = character.match(
          isPositionString
            ? isCardinalPointCharacter
              ? cardinalPointPattern
              : coordinatePattern
            : instructionsPattern
        );

        !matched &&
          errorGenerator().generate({
            error: 'Invalid input',
            message: isPositionString
              ? 'Expected initial position pattern (number, number and cardinal direction) not met.'
              : 'Expected instructions pattern (left or right or move foward) not met.',
            statusCode: 400
          });
      });

      const positionOrInstructionCharacters = isPositionString
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

  updateDirection: (params: {
    instruction: Instruction;
    currentCardinalPointIndex: CardinalPoint;
  }): CardinalDirection => {
    const { currentCardinalPointIndex, instruction } = params;

    const toLeft = instruction === 'L';
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
