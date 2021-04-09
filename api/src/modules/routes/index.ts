import { ServerRoute } from '@hapi/hapi';
import { roverRoutes } from './rover.routes';

const routeDefault: ServerRoute = {
  method: ['GET'],
  path: '/',
  handler: () => ({
    message: 'Hello, Mars!',
    status: 'running',
    timestamp: new Date()
  })
};

export const routes: ServerRoute[] = [routeDefault, ...roverRoutes];
