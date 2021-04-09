import { ServerRoute } from '@hapi/hapi';
import { roverRoutes } from './rover.routes';

const routeDefault: ServerRoute = {
  method: ['GET'],
  path: '/',
  handler: () => ({
    message: 'Hello mars!'
  })
};

export const routes: ServerRoute[] = [routeDefault, ...roverRoutes];
