/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const mongooseConnection = require('./mongodb')

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: ', p, reason)
);

server.on('listening', async() => {
  let a = "10"
    await mongooseConnection(app)
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)

  }
);
