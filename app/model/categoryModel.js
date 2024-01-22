const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
