const router = require("express").Router();
const addressController = require("../controller/addressController");
const auth = require("../middleware/index");

router.use(auth);
router.get("/address", addressController.index);
router.get("/address/user/:userId", addressController.indexId);
router.post("/address", addressController.store);
router.get("/address/:id", addressController.detail);
router.delete("/address/:id", addressController.destroy);
router.put("/address/:id", addressController.update);

module.exports = router;
