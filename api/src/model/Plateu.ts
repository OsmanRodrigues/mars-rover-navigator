import { Coordinate } from './Coordinate';

export interface Plateu {
  lowerLeft: { x: 0; y: 0 };
  upperRight: Coordinate;
}
