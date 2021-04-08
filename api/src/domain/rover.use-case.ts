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
    shiftDirection: (
      currentInstruction: Instruction,
      currentCardinalPointIndex: CardinalPoint
    ): CardinalDirection => {
      const toLeft = currentInstruction === 'L';
      const cardinalCorrectionIndex = toLeft ? 3 : 0;
      const cardinalShiftIndex = toLeft ? -1 : 1;
      const onCardinalLimit = toLeft
        ? currentCardinalPointIndex === 0
        : currentCardinalPointIndex === 3;

      const newCardinalDirection = CardinalPoint[
        onCardinalLimit
          ? cardinalCorrectionIndex
          : currentCardinalPointIndex + cardinalShiftIndex
      ] as CardinalDirection;

      return newCardinalDirection;
    }
  },

  move: (roverInfos: RoverInfosInput, limit: Coordinate): Position => {
    const { convertInput, shiftDirection } = RoverUseCase[HelpersKey];

    const [initialPosition, instructions] = convertInput(roverInfos);
    const [limitX, limitY] = limit;
    const [x, y, direction] = [...initialPosition];

    let cardinalPointIndex = CardinalPoint[direction];
    let newDirection = CardinalPoint[cardinalPointIndex] as CardinalDirection;
    let newX: number = x;
    let newY: number = y;

    instructions.forEach(instruction => {
      switch (instruction) {
        case 'M':
          newDirection === 'N' && (newY += 1);
          newDirection === 'S' && (newY -= 1);
          newDirection === 'W' && (newX -= 1);
          newDirection === 'E' && (newX += 1);

          break;

        default:
          newDirection = shiftDirection(instruction, cardinalPointIndex);

          break;
      }

      cardinalPointIndex = CardinalPoint[newDirection];
    });

    const finalPosition: Position = [newX, newY, newDirection];

    return finalPosition;
  }
};
