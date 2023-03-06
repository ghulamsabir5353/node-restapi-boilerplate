const mongoose = require('mongoose');
const config = require('@config');

module.exports = function () {
  const db = config.db;
  mongoose.set('strictQuery', true);
  mongoose
    .connect(db)
    .then(() => console.log(`Connected to ${db} 👌`))
    .catch((err) => console.log(`DB Connection Error: ${err.message} ⛔`));
};
