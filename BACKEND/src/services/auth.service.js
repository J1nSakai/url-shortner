import { ConflictError, UnauthorizedError } from "../../middleware/appError.js";
import {
  createUser,
  findUserByEmail,
  findUserByEmailAndPassword,
} from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";

export const registerUserInDB = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new ConflictError("User already exists");
  }
  const newUser = await createUser(name, email, password);
  const token = signToken({ userId: newUser._id.toString() });
  return { token, user };
};

export const loginUserInApp = async (email, password) => {
  const user = await findUserByEmailAndPassword(email);

  if (!user || !(await user.checkPassword(password))) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const token = signToken({ userId: user._id.toString() });
  delete user.password;
  return { token, user };
};
