import './module-aliases';
import { RoverUseCase } from './domain';
import { Instruction, Position } from './model';

const inputs = ['12N', 'LMLMLMLMM'];

const { Move, InputConverter } = RoverUseCase;

const position = InputConverter(inputs[0]) as Position;
const instructions = InputConverter(inputs[1]) as Instruction[];

Move({
  position,
  instructions
});
