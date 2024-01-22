const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama harus diisi"],
  },
});

const Tags = mongoose.model("Tags", tagSchema);
module.exports = Tags;
