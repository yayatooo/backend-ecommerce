const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const secretKey = require("../config");

const index = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);

    res.json({ verified });
  } catch (err) {
    console.log(err);
    res.status(401).json(false);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({ message: "Harap isi semua kolom" });
    }
    if (password.length <= 5) {
      res
        .status(401)
        .json({ message: "Password harus lebih dari 5 karaketer" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({ message: "Email sudah terdaftar" });
    }
    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const saveNewUser = await newUser.save();

    const token = jwt.sign({ id: saveNewUser._id }, process.env.SECRET_KEY);

    // set token to http only
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send(saveNewUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // validate
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Email Dan Password harap diisi" });
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        message: "User Tidak Ditemukan",
      });
    }
    // chekking user from database
    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password Salah",
      });
    }

    // masuk

    const token = jwt.sign(
      { User: existUser, id: existUser._id },
      process.env.SECRET_KEY
    );
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        message: "Selamat Datang Kembali",
        User: existUser,
        token,
        id: existUser._id,
        name: existUser.name,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Sampai Jumpa Lagi" });
};

const loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.SECRET_KEY);

    res.send(true);
  } catch (err) {
    console.log(err);
    res.status(401).json(false);
  }
};

module.exports = {
  index,
  register,
  login,
  logout,
  loggedIn,
};
