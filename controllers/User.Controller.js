const {
  hashedPassword,
  generateAccessToken,
  comparePassword,
} = require("../auth/auth");
const User = require("../models/User.Model");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, mobile, country, state, city, gender } =
      req.body;
    console.log("req", req.body);
    const mobileNumber = mobile ? Number(mobile) : null;
    const hashPassword = await hashedPassword(password);
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      mobile: mobileNumber,
      country: country,
      state: state,
      city: city,
      gender: gender,
    });
    console.log("user", user);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userMatch = await User.findOne({ email });
    if (!userMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await comparePassword(password, userMatch.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = await generateAccessToken(userMatch);
    res.cookie("accessToken", accessToken);
    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    // return res.json({
    //   message: error.message,
    // });
    next(error);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "You are logged out" });
};
