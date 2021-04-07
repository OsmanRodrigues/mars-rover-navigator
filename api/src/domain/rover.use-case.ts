import {
  CardinalDirection,
  CardinalPoint,
  Instruction,
  Movement,
  Position,
  Rover
} from '@model';

export const RoverUseCase = {
  InputConverter: (string: string): Position | Instruction[] => {
    const splitedString = string.split('');
    const isPosition = splitedString.some(
      (character: CardinalDirection) => !!(CardinalPoint[character] + 1)
    );

    if (isPosition) {
      const position: Position = [
        +splitedString[0],
        +splitedString[1],
        splitedString[2] as CardinalDirection
      ];

      return position;
    }

    const instructions = splitedString.filter(
      (character: Instruction) => !!(Movement[character] + 1)
    ) as Instruction[];

    return instructions;
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
