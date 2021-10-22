const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

const auth = require("../middleware/auth");

router.post("/comment", auth, commentsCtrl.commentPost);
router.delete("/comment/:id", auth, commentsCtrl.deleteComment);

module.exports = router;
