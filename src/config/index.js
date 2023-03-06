require('dotenv').config();

module.exports = {
  // eslint-disable-next-line no-undef
  port: process.env.PORT,
  // eslint-disable-next-line no-undef
  REDIS_PORT: process.env.REDIS_PORT,
  db: 'mongodb+srv://ghulam:1122@cluster0.mo0iwpd.mongodb.net/test',
  jwtPrivateKey: 'asdlkjlk9j29pu2djkja012lkjasd',
  forgot_password_key: 'gd82td65ig29ylkjlakszn,qi',
};
