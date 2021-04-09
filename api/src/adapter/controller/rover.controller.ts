import { MovePayload } from '@data/rover.data';
import { RoverUseCase } from '@domain/rover.use-case';
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
      const finalPosition = RoverUseCase.move(movePayload);

      return res.response({ finalPosition }).code(200);
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
      const targetValue = payload[targetKey];

      const error = 'Invalid payload';
      const statusCode = 400;

      const message1 =
        !targetValue && `The ${targetKey} field must be provided.`;
      const message2 =
        (!Array.isArray(targetValue) || targetValue.length !== 2) &&
        `The ${targetKey} field must be a two items array.`;

      const hasValueError = Boolean(message1 || message2);
      const defaultError =
        hasValueError &&
        errorGenerator({
          error,
          message: message1 || message2,
          statusCode
        });

      switch (targetKey) {
        case 'limitCoordinate':
          defaultError?.generate?.();
          break;

        case 'roverInfos':
          defaultError?.generate?.();
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
