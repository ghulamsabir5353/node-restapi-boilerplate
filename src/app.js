//config file
require('dotenv').config();
//import module aliases
require('module-alias/register');
const express = require('express');
const app = express();
const colors = require('@loaders/colors');
const config = require('@config');
const loaders = require('@loaders/loaders');
// const logger = require("./logger/logger")

async function startServer() {
  // load all middleware=>loaders functions using the init() method
  loaders.init({ expressApp: app });

  // eslint-disable-next-line no-undef
  const PORT = config.port;

  app
    .listen(PORT, () => {
      console.log(
        colors.fg.cyan,
        `
      ########################################
      🛡️  Server is listening on port: ${PORT} 🛡️
      ########################################
      `,
        colors.reset
      );
    })
    .on('error', (err) => {
      console.log('Server Starting Error: ', err);
      // eslint-disable-next-line no-undef
      process.exit(1);
    });
}

startServer();
