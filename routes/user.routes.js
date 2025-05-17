const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controllers");
const { authMiddleware } = require("../middleware/authmiddleware");

router.get("/users", authMiddleware, user.getAllUsers);
router.get("/user/:id", authMiddleware, user.getUserById);
router.put("/user/:id", authMiddleware, user.updateUserById);
router.delete("/user/:id", authMiddleware, user.deleteUserById);

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/me", authMiddleware, user.getMe)

module.exports = router;
