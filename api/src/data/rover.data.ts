import { Coordinate, RoverInfosInput } from '@model';

export interface MovePayload {
  roverInfos: RoverInfosInput;
  limitCoordinate: Coordinate;
}
