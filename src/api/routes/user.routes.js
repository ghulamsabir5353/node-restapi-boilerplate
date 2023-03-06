const { Router } = require('express');
const router = Router();
const {
  addUser,
  allUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsersTest,
} = require('@controllers/user.controller');

router.post('/', addUser);

router.post('/list', allUsers);

router.post('/get-one', getUserById);

router.post('/update-one/:id', updateUserById);

router.post('/delete-one/:id', deleteUserById);

//test
router.get('/users-list', getAllUsersTest);

module.exports = router;
