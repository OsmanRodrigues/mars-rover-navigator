import { CardinalPoint } from './constant';

export type CardinalDirection = keyof typeof CardinalPoint;

export type Position = [number, number, CardinalDirection];
