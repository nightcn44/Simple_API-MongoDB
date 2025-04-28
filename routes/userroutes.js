const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontrollers');
// const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/ur', user.createUser);
// router.get('/ur', User.getAllUsers);
// router.get('/ur/:id', User.getUserById);
// router.put('/ur/:id', User.updateUserById);
// router.delete('/ur/:id', User.deleteUserById);

module.exports = router;