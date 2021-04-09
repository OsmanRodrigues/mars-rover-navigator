import { RoverController } from '@adapter/controller';
import { ServerRoute } from '@hapi/hapi';

const { move } = RoverController;

export const roverRoutes: ServerRoute[] = [
  {
    method: ['GET'],
    path: '/move',
    handler: move
  }
];
