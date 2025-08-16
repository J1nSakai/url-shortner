import { getUserUrls } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res) => {
  try {
    const { _id } = req.user;
    const urls = await getUserUrls(_id);
    res.status(200).json({ message: "Success", urls: urls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
