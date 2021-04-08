import './module-aliases';
import { RoverUseCase } from './domain';
import { Coordinate, HoverInfosInput } from './model';
//
// Example
//
const limit: Coordinate = [5, 5];
const rover1Infos: HoverInfosInput = ['1 2 N', 'LMLMLMLMM'];
const rover2Infos: HoverInfosInput = ['3 3 E', 'MMRMMRMRRM'];

const rovers = [rover1Infos, rover2Infos];

const { move } = RoverUseCase;

rovers.forEach((roverInfos, index) => {
  const finalPosition = move(roverInfos, limit);

  console.log(index, 'final: ', finalPosition);
});
