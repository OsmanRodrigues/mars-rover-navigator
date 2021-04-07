import './module-aliases';
import { RoverUseCase } from './domain';

const inputs = ['3 3 E', 'M M R MMRMRRM'];

const { Move, InputParser } = RoverUseCase;

const position = InputParser(inputs[0]).getPosition();
const instructions = InputParser(inputs[1]).getInstructions();

const finalPosition = Move({
  position,
  instructions
});

console.log('final: ', finalPosition);
