const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontrollers');
const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/user', authMiddleware, user.createUser);
router.get('/users', authMiddleware, user.getAllUsers);
router.get('/user/:id', authMiddleware, user.getUserById);
router.put('/user/:id', authMiddleware, user.updateUserById);
router.delete('/user/:id', authMiddleware, user.deleteUserById);

module.exports = router;