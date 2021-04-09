import { RoverController } from '@adapter/controller';
import { ServerRoute } from '@hapi/hapi';
import { RouteName } from './route-name.routes';

export const roverRoutes: ServerRoute[] = [
  {
    method: ['POST'],
    path: RouteName.Rover.move,
    handler: RoverController.move
  }
];
