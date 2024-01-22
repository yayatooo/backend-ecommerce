const Tags = require("../model/tagModel");

const insertTags = async (req, res) => {
  const { name } = req.body;
  const newTags = new Tags({ name });
  try {
    const insertedTags = await newTags.save();
    res.status(200).json({
      message: "Tags successfully inserted",
      product: insertedTags,
    });
  } catch (error) {
    console.error("Error saving Tags:", error.message);
    return res.status(400).json({ error: error.message || "Bad Request" });
  }
};

const updateTags = async (req, res) => {
  const { name } = req.body;
  const tagsId = req.params.id;
  try {
    const updatedTags = await Tags.findByIdAndUpdate(
      tagsId,
      { name },
      { new: true }
    );
    res.status(200).json({
      message: "Tags successfully inserted",
      product: updatedTags,
    });
  } catch (error) {
    console.error("Error saving Tags:", error.message);
    return res.status(400).json({ error: error.message || "Bad Request" });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Tags.find();
    res.send(tags);
  } catch (error) {
    console.log(error);
  }
};
const getTagsById = async (req, res) => {
  const tagsId = req.params.id;
  try {
    const tags = await Tags.findById(tagsId);
    res.send(tags);
  } catch (error) {
    console.log(error);
  }
};
const deleteTags = async (req, res) => {
  const tagsId = req.params.id;
  try {
    const deletedTags = await Tags.deleteOne({ _id: tagsId });

    if (deletedTags.deletedCount > 0) {
      res.status(200).json({
        message: "Product successfully deleted",
        product: deletedTags,
      });
    } else {
      res.status(404).json({
        message: "Product not found or not deleted",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  getTags,
  getTagsById,
  insertTags,
  updateTags,
  deleteTags,
};
