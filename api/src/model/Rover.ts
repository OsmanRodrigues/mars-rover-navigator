import { Movement } from './constant';

export type Instruction = keyof typeof Movement;

export type RoverInfosInput = [string, string];
