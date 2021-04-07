import { CardinalDirection, Movement } from './constant';
import { Coordinate } from './Coordinate';

interface Position extends Coordinate {
  direction: CardinalDirection;
}

export interface Rover {
  positons: Position[][];
  instructions: Movement[][];
}
