const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addNewUserToGroupChat,
  removeUserFromGroup,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/group-remove-user").put(protect, removeUserFromGroup);
router.route("/group-add-user").put(protect, addNewUserToGroupChat);

module.exports = router;
