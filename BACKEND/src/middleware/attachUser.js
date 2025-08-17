import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const attachUser = async (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    console.log(decoded);

    const user = await findUserById(decoded.userId);
    console.log(user);

    if (!user) return next();
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
