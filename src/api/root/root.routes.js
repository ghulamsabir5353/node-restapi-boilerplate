const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Initial Route running healthy '.repeat(10000));
});

module.exports = router;
