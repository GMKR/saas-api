import './utils/env';
import Fastify from 'fastify';
import AppService from './app';

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace');

// Instantiate Fastify with some config
const app = Fastify({
  logger: false,
});

app.register(AppService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }: any) => {
  if (err) {
    app.log.error(err);
  }
  await app.close();
});

app.addHook('onClose', async (_, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen(process.env.PORT || 9000, (err) => {
  if (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
  console.table(app.printRoutes());
});
