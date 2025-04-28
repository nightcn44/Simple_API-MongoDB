const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontrollers');
// const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/user', user.createUser);
router.get('/users', user.getAllUsers);
// router.get('/user/:id', User.getUserById);
// router.put('/user/:id', User.updateUserById);
// router.delete('/user/:id', User.deleteUserById);

module.exports = router;