import {
  CardinalDirection,
  CardinalPoint,
  Coordinate,
  RoverInfosInput,
  Instruction,
  Position
} from '@model';

type ConvertInputReturn = [
  initialPosition: Position,
  instructions: Instruction[]
];

const HelpersKey = Symbol('RoverUseCaseHelpers');

export const RoverUseCase = {
  [HelpersKey]: {
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
  },

  move: (roverInfos: RoverInfosInput, limit: Coordinate): Position => {
    const { convertInput, updateDirection } = RoverUseCase[HelpersKey];
    const [initialPosition, instructions] = convertInput(roverInfos);
    const [limitX, limitY] = limit;
    const [x, y, direction] = [...initialPosition];

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
            currentY < limitY ? currentY++ : currentY--;
            break;
          case 'S':
            currentY > 0 ? currentY-- : currentY++;
            break;
          case 'W':
            currentX > 0 ? currentX-- : currentX++;
            break;
          case 'E':
            currentX < limitX ? currentX++ : currentX--;
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
