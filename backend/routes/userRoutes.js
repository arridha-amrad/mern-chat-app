const express = require("express");
const { login, signup } = require("../controllers/authController");
const { getAllUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.route("/").post(signup).get(protect, getAllUsers);

module.exports = router;
