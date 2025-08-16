import User from "../models/user.model.js";
import shorturlModel from "../models/shorturl.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

export const findUserByEmailAndPassword = async (email) => {
  return await User.findOne({ email: email }).select("+password");
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (name, email, password) => {
  const newUser = new User({ name: name, email: email, password: password });
  await newUser.save();
  return newUser;
};

export const getUserUrls = async (userId) => {
  const urls = await shorturlModel
    .find({
      user: userId,
    })
    .sort({ createdAt: -1 }); // Sort by newest first
  return urls;
};
