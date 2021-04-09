import { Movement } from './constant';

export enum RoverAction {
  move = 'move'
}

export type Instruction = keyof typeof Movement;

export type RoverInfosInput = [string, string];
