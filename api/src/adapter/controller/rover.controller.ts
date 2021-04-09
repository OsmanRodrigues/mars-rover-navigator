import { MovePayload } from '@data/rover.data';
import { Lifecycle } from '@hapi/hapi';
import { RoverAction } from '@model/Rover';
import { errorGenerator } from '@modules/utils';

type RoverController = {
  [key in RoverAction]: Lifecycle.Method;
};

export const RoverController: RoverController = {
  [RoverAction.move]: async (req, res) => {
    try {
      const movePayload = req.payload as MovePayload;
      RoverControllerHelpers.validPayload(movePayload);

      return { message: 'Rover moving...' };
    } catch (err) {
      console.log('err: ', err);
      const { error, message, statusCode } = err;

      return res
        .response({
          error,
          message
        })
        .code(statusCode);
    }
  }
};

const RoverControllerHelpers = {
  validPayload: (payload: MovePayload): void => {
    const payloadKeys = Object.keys(payload);

    if (!payloadKeys.length) {
      errorGenerator().generate({
        error: 'No payload',
        message: 'Payload must provided.',
        statusCode: 400
      });
    }

    payloadKeys.forEach(key => {
      const targetKey = key as keyof MovePayload;
      const tagetValue = payload[targetKey];

      const error = 'Invalid payload';
      const statusCode = 400;
      const message = !tagetValue && `The ${targetKey} field must be provided.`;
      const defaultError = errorGenerator({
        error,
        message,
        statusCode
      });
      switch (targetKey) {
        case 'limitCoordinate':
          message && defaultError.generate();
          break;

        case 'roverInfos':
          message && defaultError.generate();
          break;

        default:
          defaultError.generate({
            error,
            message: 'Fields limitCoordinate and roverInfos must be provided.',
            statusCode
          });
          break;
      }
    });
  }
};
