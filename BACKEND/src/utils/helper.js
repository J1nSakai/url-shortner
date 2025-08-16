import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

export const generateNanoId = (len) => {
  return nanoid(len);
};

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
