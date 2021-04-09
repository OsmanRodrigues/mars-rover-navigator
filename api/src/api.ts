import './module-aliases';
import Hapi from '@hapi/hapi';
import { routes, env } from './modules';

const { api } = env;

const init = async () => {
  const server = Hapi.server({
    host: api.host,
    port: api.port
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
