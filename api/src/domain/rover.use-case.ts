import {
  CardinalDirection,
  CardinalPoint,
  HoverInfosInput,
  Instruction,
  Position
} from '@model';

interface InputParserReturn {
  initialPosition: Position;
  instructions: Instruction[];
}

const InputParserKey = Symbol('InputParser');

export const RoverUseCase = {
  [InputParserKey]: (input: HoverInfosInput): InputParserReturn => {
    const [initialPosition, instructions] = input.map((string, index) => {
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

    return {
      initialPosition,
      instructions
    };
  },

  Move: (roverInfos: HoverInfosInput): Position => {
    const { initialPosition, instructions } = RoverUseCase[InputParserKey](
      roverInfos
    );
    const [x, y, direction] = [...initialPosition];

    let cardinalPointIndex = CardinalPoint[direction];
    let newDirection = CardinalPoint[cardinalPointIndex];
    let newX: number = x;
    let newY: number = y;

    instructions.forEach(instruction => {
      switch (instruction) {
        case 'L':
          cardinalPointIndex === 0
            ? (newDirection = CardinalPoint[3])
            : (newDirection = CardinalPoint[cardinalPointIndex - 1]);

          break;

        case 'R':
          cardinalPointIndex === 3
            ? (newDirection = CardinalPoint[0])
            : (newDirection = CardinalPoint[cardinalPointIndex + 1]);

          break;

        case 'M':
          newDirection === 'N' && (newY += 1);
          newDirection === 'S' && (newY -= 1);
          newDirection === 'W' && (newX -= 1);
          newDirection === 'E' && (newX += 1);

          break;
      }

      cardinalPointIndex = CardinalPoint[newDirection as CardinalDirection];
    });

    const finalPosition: Position = [
      newX,
      newY,
      newDirection as CardinalDirection
    ];

    return finalPosition;
  }
};
