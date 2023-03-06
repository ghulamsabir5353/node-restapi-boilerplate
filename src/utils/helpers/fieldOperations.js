// const { errorWrapper } = require('./errorWrapper');
const { MainErrorHandler } = require('./MainErrorHandler');

const verifyRequiredFieldsHelper = (passedObject) => {
  try {
    // console.log(passedObject);
    let msgToSay = '';
    for (const prop in passedObject) {
      if (
        passedObject[prop] === undefined ||
        passedObject[prop] === null ||
        passedObject[prop] === ''
      ) {
        msgToSay = msgToSay + ' ' + prop;
      }
    }
    if (msgToSay !== '') {
      msgToSay += ' are required fields!';
      throw new MainErrorHandler(msgToSay, 404);
    }
    return true;
  } catch (err) {
    console.log(
      `💥💥This error is created from verifyRequiredFields ${err.message}💥💥`
    );
    throw err;
  }
};

module.exports = { verifyRequiredFieldsHelper };
