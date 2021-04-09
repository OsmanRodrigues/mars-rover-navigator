import { ServerRoute } from '@hapi/hapi';

export const roverRoutes: ServerRoute[] = [
  {
    method: ['GET'],
    path: '/move',
    handler: (request, response) => ({ message: 'Hover moving...' })
  }
];
