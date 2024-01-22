const router = require("express").Router();
const multer = require("multer");
const productController = require("../controller/productController");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/product", productController.getProduct);
router.get("/product/:id", productController.getProductById);
router.post(
  "/product",
  upload.single("image"),
  productController.insertProduct
);
router.patch(
  "/product/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete("/product/:id", productController.deletedPrductById);

module.exports = router;
