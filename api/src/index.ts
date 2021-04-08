import './module-aliases';
import { RoverUseCase } from './domain';
import { HoverInfosInput } from './model';
//
// Example
//
const rover1Infos: HoverInfosInput = ['1 2 N', 'LMLMLMLMM'];
const rover2Infos: HoverInfosInput = ['3 3 E', 'MMRMMRMRRM'];

const rovers = [rover1Infos, rover2Infos];

const { Move } = RoverUseCase;

rovers.forEach((roverInfos, index) => {
  const finalPosition = Move(roverInfos);

  console.log(index, 'final: ', finalPosition);
});
