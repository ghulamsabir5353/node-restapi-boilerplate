const express = require('express');

const Root = require('@api/root/root.routes');
const User = require('@api/routes/user.routes');

module.exports = function (app) {
  app.use(express.json());
  app.use('/', Root);
  app.use('/user', User);
};
