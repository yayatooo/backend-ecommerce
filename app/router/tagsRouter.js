const router = require("express").Router();
const tagsController = require("../controller/tagsController");

router.get("/tags", tagsController.getTags);
router.get("/tags/:id", tagsController.getTagsById);
router.post("/tags", tagsController.insertTags);
router.patch("/tags/:id", tagsController.updateTags);
router.delete("/tags/:id", tagsController.deleteTags);

module.exports = router;
