import {
  CardinalDirection,
  CardinalPoint,
  Instruction,
  Movement,
  Position,
  Rover
} from '@model';

interface InputParserReturn {
  getPosition: () => Position;
  getInstructions: () => Instruction[];
}

export const RoverUseCase = {
  InputParser: (string: string): InputParserReturn => {
    const splitedString = string.split('');
    const filteredString = splitedString.filter(
      character => !!character.trim()
    );
    const isPosition = filteredString.some(
      (character: CardinalDirection) => !!(CardinalPoint[character] + 1)
    );

    return {
      getPosition: () => {
        const parsedPosition: Position = isPosition
          ? [
              +filteredString[0],
              +filteredString[1],
              filteredString[2] as CardinalDirection
            ]
          : null;

        return parsedPosition;
      },
      getInstructions: () => {
        const parsedInstructions = isPosition
          ? null
          : (filteredString.filter(
              (character: Instruction) => !!(Movement[character] + 1)
            ) as Instruction[]);

        return parsedInstructions;
      }
    };
  },

  Move: (rover: Rover): Position => {
    const { instructions, position: currentPosition } = rover;
    const [x, y, direction] = [...currentPosition];

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
