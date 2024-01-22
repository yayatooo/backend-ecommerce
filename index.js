const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const productRouter = require("./app/router/productRouter");
const tagsRouter = require("./app/router/tagsRouter");
const categoryRouter = require("./app/router/categoryRouter");
const userRouter = require("./app/router/userRouter");
const addressRouter = require("./app/router/addressRouter");
const app = express();
const port = 3000;
const url = "mongodb://127.0.0.1:27017/ecommerce";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(categoryRouter);
app.use(productRouter);
app.use(tagsRouter);
app.use(userRouter);
app.use(addressRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
