import { Coordinate } from '@model/Coordinate';
import { RoverInfosInput } from '@model/Rover';

export interface MovePayload {
  roverInfos: RoverInfosInput;
  limitCoordinate: Coordinate;
}
