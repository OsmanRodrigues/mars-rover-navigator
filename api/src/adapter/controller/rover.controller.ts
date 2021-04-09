import { MovePayload } from '@data/rover.data';
import { Lifecycle } from '@hapi/hapi';
import { RoverAction } from '@model/Rover';

type RoverController = {
  [key in RoverAction]: Lifecycle.Method;
};

export const RoverController: RoverController = {
  [RoverAction.move]: (req, res) => {
    const movePayload = req.payload as MovePayload;

    RoverControllerHelpers.validPayload(movePayload);

    console.log('payload: ', movePayload);

    return { message: 'Rover moving...' };
  }
};

const RoverControllerHelpers = {
  validPayload: (payload: MovePayload): boolean => {
    return true;
  }
};
