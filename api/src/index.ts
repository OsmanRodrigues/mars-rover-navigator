import './module-aliases';
import { RoverUseCase } from './domain';
//
// Example
//
const rover1 = ['1 2 N', 'LMLMLMLMM'];
const rover2 = ['3 3 E', 'MMRMMRMRRM'];

const rovers = [rover1, rover2];

const { Move, InputParser } = RoverUseCase;

rovers.forEach((rover, index) => {
  const position = InputParser(rover[0]).getPosition();
  const instructions = InputParser(rover[1]).getInstructions();

  const finalPosition = Move({
    position,
    instructions
  });

  console.log(index, 'final: ', finalPosition);
});
