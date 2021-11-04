const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");

router.post("/", auth, commentsCtrl.commentPost);
router.get("/:id", auth, commentsCtrl.getComment);
router.get("/", auth, commentsCtrl.getAllComments);
router.delete("/:id", auth, commentsCtrl.deleteComment);

module.exports = router;
