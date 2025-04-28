const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontrollers');
// const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/user', user.createUser);
router.get('/users', user.getAllUsers);
router.get('/user/:id', user.getUserById);
router.put('/user/:id', user.updateUserById);
router.delete('/user/:id', user.deleteUserById);

module.exports = router;