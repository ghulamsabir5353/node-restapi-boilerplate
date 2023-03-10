const { MainErrorHandler } = require('./MainErrorHandler');

const errorWrapper = (err, isUnhandledType = false, code = 400) => {
  if (isUnhandledType) {
    // console.log(err)
    if (err.name && err.name !== 'MainErrorHandler') {
      const codeToUse = code || err.errorCode;
      err = new MainErrorHandler(err.message, codeToUse);
    }
    console.log(
      'š„š„š„š„.\n Unhandler type of error occured:\n',
      err.getFormattedResponse(),
      '\nš„š„š„š„\n'
    );
  }
  if (err.name && err.name === 'MainErrorHandler') {
    return err;
  } else {
    return new MainErrorHandler(err.message, code);
  }
};

module.exports = {
  errorWrapper,
};
