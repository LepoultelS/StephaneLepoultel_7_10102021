const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");

router.post("/", auth, postsCtrl.createPost);
router.get("/", auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getPostsByUser);
router.get("/:id", auth, postsCtrl.getOnePost);
router.delete("/:id", auth, postsCtrl.deletePost);

module.exports = router;
