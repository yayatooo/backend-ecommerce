const router = require("express").Router();
const categoryController = require("../controller/categoryController");

router.get("/category", categoryController.getCategory);
router.get("/tes", (req, res) => {
  res.send({ message: "Halo dari route tes" });
});
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.insertCategory);
router.patch("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
