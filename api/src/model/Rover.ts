import { Movement } from './constant';
import { Position } from './Position';

export type Instruction = keyof typeof Movement;

export interface Rover {
  position: Position;
  instructions: Instruction[];
}
