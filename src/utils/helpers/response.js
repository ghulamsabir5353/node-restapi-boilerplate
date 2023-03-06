const success = (res, statusCode, message, data) => {
  res.status(200).json({
    status: true,
    message: message,
    data: data,
  });
};

const status200 = (res) => {
  res.status(200).json({
    status: true,
    message: 'Success',
  });
};

module.exports = {
  success,
  status200,
};
