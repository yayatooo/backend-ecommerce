const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/getuser", userController.index);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/loggedIn", userController.loggedIn);

module.exports = router;
