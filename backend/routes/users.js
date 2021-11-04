const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.get("/:id", auth, usersCtrl.getOneUser);
router.put("/update", auth, usersCtrl.updateOneUser);
router.delete("/:id", auth, usersCtrl.deleteOneUser);

module.exports = router;
