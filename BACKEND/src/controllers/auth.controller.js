import { cookieOptions } from "../config/config.js";
import { registerUserInDB, loginUserInApp } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await registerUserInDB(name, email, password);
    res.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(201).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const { token, user } = await loginUserInApp(email, password);
    console.log("user", user);

    res.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ user: user, message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error);
  }
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({ user: req.user });
};
