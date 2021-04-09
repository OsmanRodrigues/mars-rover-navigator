import { Lifecycle } from '@hapi/hapi';
import { RoverAction } from '@model/Rover';

type RoverController = {
  [key in RoverAction]: Lifecycle.Method;
};

export const RoverController: RoverController = {
  [RoverAction.move]: (req, res) => ({ message: 'Rover moved!' })
};
