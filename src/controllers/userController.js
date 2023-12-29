// src/controllers/userController.js
import User from "../models/user.js";
import crypto from "crypto";
import { setUser } from "../utils/auth.js";

const registerUser = async (req, res) => {
  const { email, role, password } = req.body;

  try {
    const newUser = new User({ email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Generate a random token (not JWT)
function generateRandomToken(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // // Generate a random token (not JWT)
    // const token = generateRandomToken();
    // user.token = token;
    // await user.save();

    //    use jwt
    const token = setUser(user);
    console.log("jwt token is", token);
    res.cookie("token", token);

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { registerUser, loginUser };
