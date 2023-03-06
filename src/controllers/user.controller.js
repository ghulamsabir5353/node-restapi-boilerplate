const { errorWrapper } = require('@helpers/errorWrapper');
// const { MainErrorHandler } = require('@/helpers/MainErrorHandler');
const { verifyRequiredFieldsHelper } = require('@helpers/fieldOperations');
const { success } = require('@helpers/response');
const User = require('../models/User.model');
const { UserService } = require('@services/user.service');

//Create a new User
const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if(!email){
    //     throw new MainErrorHandler("Email is required field!",404)
    // }
    // <----- OR ------>
    verifyRequiredFieldsHelper({ email, password });

    const userService = new UserService();

    // const users = await userService.find(
    //   { email: req.body.email },
    //   { password: 0 }
    // );

    const newUser = await userService.create(req.body);

    success(res, 200, 'User Created Successfuly', newUser);
  } catch (err) {
    const handledError = errorWrapper(err);
    res
      .status(handledError.errorCode)
      .json(handledError.getFormattedResponse());
  }
};

//List of All Users
const allUsers = async (req, res) => {
  try {
    const { page, dataPerPage } = req.body;

    const userService = new UserService();

    //checking required fields
    verifyRequiredFieldsHelper({ page, dataPerPage });

    const users = await userService.findAll(req.body);

    success(res, 200, 'Success', users);
  } catch (err) {
    const handledError = errorWrapper(err);
    res
      .status(handledError.errorCode)
      .json(handledError.getFormattedResponse());
  }
};

//get user by Id in body
const getUserById = async (req, res) => {
  try {
    const { userId } = req.body;

    //checking required field
    verifyRequiredFieldsHelper({ userId });

    const userService = new UserService();

    const user = await userService.findOneById(
      { _id: userId },
      { password: 0 }
    );

    success(res, 200, 'Success', user);
  } catch (err) {
    const handledError = errorWrapper(err);
    res
      .status(handledError.errorCode)
      .json(handledError.getFormattedResponse());
  }
};

//update by userId in params
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    //check required fields
    verifyRequiredFieldsHelper({ id });

    const userService = new UserService();

    const updatedUser = await userService.updateUser({ _id: id }, req.body);

    success(res, 200, 'Updated Successfully', updatedUser);
  } catch (err) {
    const handledError = errorWrapper(err);
    res
      .status(handledError.errorCode)
      .json(handledError.getFormattedResponse());
  }
};

//Delete a user by userId
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    //check required fields
    verifyRequiredFieldsHelper({ id });

    const userService = new UserService();

    await userService.deleteOne({ _id: id });

    res.status(200).json({
      status: true,
      message: 'Deleted successfully',
    });
  } catch (err) {
    const handledError = errorWrapper(err);
    res
      .status(handledError.errorCode)
      .json(handledError.getFormattedResponse());
  }
};

//simple get all api
const getAllUsersTest = async (req, res) => {
  try {
    const users = await User.find();

    console.table(users);

    res.status(200).send({
      status: true,
      message: 'Success',
      data: users,
    });
  } catch (err) {
    const handledError = errorWrapper(err);
    res
      .status(handledError.errorCode)
      .json(handledError.getFormattedResponse());
  }
};

module.exports = {
  addUser,
  allUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsersTest,
};
