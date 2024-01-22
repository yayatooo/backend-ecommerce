const Adress = require("../model/addressModel");

const index = async (req, res) => {
  const userId = req.user._id;

  try {
    const adress = await Adress.find({ user: userId }).populate("user");
    res.send({
      status: "success",
      adress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const indexId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userAddresses = await Adress.find({ user: userId }).populate("user");
    res.status(200).json(userAddresses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const store = async (req, res) => {
  const { name, kelurahan, kecamatan, kota, provinsi, detail } = req.body;

  const userId = req.user._id;
  try {
    const address = await Adress.create({
      name,
      kelurahan,
      kecamatan,
      kota,
      provinsi,
      user: userId,
      detail,
    });

    res.json({
      message: "Input Berhasil",
      address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Adress.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: "Alamat tidak di temukan" });
    }
    res
      .status(201)
      .json({ message: "Alamat berhasil di hapus", data: address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const address = await Adress.findByIdAndUpdate(id, payload, { new: true });
    if (!address) {
      return res.status(404).json({ message: "Alamat tidak ditemukan" });
    }
    res
      .status(200)
      .json({ message: "Alamat berhasil diperbarui", data: address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getAddress = async (req, res, next) => {
//   try {
//     const address = await Adress.findById(req.params.id);
//     if (address == null) {
//       return res.status(404).json({ message: "Alamat tidak ditemukan" });
//     }

//     res.locals.address = address;
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const detail = (req, res) => {
  res.status(200).json(res.locals.address);
};
module.exports = {
  index,
  indexId,
  store,
  destroy,
  update,
  detail,
};
