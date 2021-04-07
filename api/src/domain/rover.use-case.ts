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
    const { instructions, position: initialPosition } = rover;
    const finalPosition: Position = [...initialPosition];

    instructions.forEach(instruction => {
      switch (instruction) {
        case 'L':
          break;

        case 'R':
          break;

        case 'M':
          break;
      }
      console.log(instruction, Movement[instruction]);
    });

    return finalPosition;
  }
};
